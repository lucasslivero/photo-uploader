import { useEffect, useState } from "react";

function ImageList() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/mongo-files");
        const data = await res.json();

        if (data.success) {
          const imagesUrl = await Promise.all(
            data.data.map(async (image) => {
              const presignedRes = await fetch("/api/presigned-download", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ key: image.key }),
              });

              const presignedData = await presignedRes.json();

              return {
                ...image,
                url: presignedData.url,
              };
            })
          );
          setImages(imagesUrl);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchImages();
  }, []);
   return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border-collapse rounded-lg overflow-hidden bg-zinc-900/50 border border-zinc-800">
        <thead className="bg-zinc-800 text-zinc-200">
          <tr>
            <th className="px-6 py-3 text-left">Key</th>
            <th className="px-6 py-3 text-left">Image</th>
          </tr>
        </thead>
        <tbody>
          {images.map((image) => (
            <tr
              key={image._id}
              className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors"
            >
              <td className="px-6 py-4 text-zinc-100">{image.key}</td>
              <td className="px-6 py-4">
                <img
                  src={image.url}
                  alt={image.key}
                  className="w-48 h-auto rounded-md shadow-sm bg-zinc-800"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default ImageList;
