import React from 'react';

const Downloader = ({ url, fileName }) => {
    const downloadFile = async () => {
        try {

            const response = await fetch(url);

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const blob = await response.blob();
            const link = document.createElement('a');
            const fileURL = window.URL.createObjectURL(blob);
            link.href = fileURL;
            link.download = fileName || 'audio.mp3';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(fileURL);
        } catch (error) {
            console.error("File download failed:", error);
        }
    };

    return (
        <button onClick={downloadFile} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Download File
        </button>
    );
};

export default Downloader;
