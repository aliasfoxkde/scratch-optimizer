const dropzone = document.getElementById("dropzone");
const summaryDiv = document.getElementById("summary");

dropzone.addEventListener("dragover", (e) => {
	e.preventDefault();
	dropzone.classList.add("dragging");
});

dropzone.addEventListener("dragleave", () => {
	dropzone.classList.remove("dragging");
});

dropzone.addEventListener("drop", async (e) => {
	e.preventDefault();
	dropzone.classList.remove("dragging");

	const file = e.dataTransfer.files[0];
	if (file) {
		await uploadFile(file);
	}
});

dropzone.addEventListener("click", async () => {
	const input = document.createElement("input");
	input.type = "file";
	input.accept = ".sb3";
	input.onchange = async (e) => {
		const file = e.target.files[0];
		if (file) {
			await uploadFile(file);
		}
	};
	input.click();
});

async function uploadFile(file) {
	const formData = new FormData();
	formData.append("file", file);

	summaryDiv.innerHTML = "<p>Processing...</p>";

	try {
		const response = await fetch("/upload", {
			method: "POST",
			body: formData,
		});

		if (!response.ok) {
			throw new Error(await response.text());
		}

		const { message, originalSize, optimizedSize, downloadLink } = await response.json();

		summaryDiv.innerHTML = `
			<h2>${message}</h2>
			<p><strong>Original File Size:</strong> ${originalSize} MB</p>
			<p><strong>Optimized File Size:</strong> ${optimizedSize} MB</p>
			<p><a href="${downloadLink}" download>Download Optimized File</a></p>
		`;
	} catch (err) {
		summaryDiv.innerHTML = `<p style="color: red;">Error: ${err.message}</p>`;
	}
}