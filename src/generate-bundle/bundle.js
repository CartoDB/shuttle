import JSZip from 'jszip';
import FileSaver from 'file-saver';

export function generateBundle(fileStructure) {
  const zipFile = new JSZip();

  Object.keys(fileStructure).forEach(fileDir =>
    zipFile.file(fileDir, fileStructure[fileDir])
  );

  return zipFile.generateAsync({ type: 'blob' })
  .then(function (content) {
    return FileSaver(content, 'airship-template.zip');
  });
}
