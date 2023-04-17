import app, { init, close } from "@/app";

const PORT = process.env.PORT || 5000;

init()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch(async (err) => {
		console.error(err);
		await close();
	});
