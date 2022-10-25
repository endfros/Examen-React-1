import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';

export const Upload = () => {
    const [files, setFiles] = useState([]);
    const {getRootProps, getInputProps} = useDropzone({
      accept: {
        'image/*': []
      },
      onDrop: acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })));
      }
    });
    
    const thumbs = files.map(file => (
      <div key={file.name}>
        <div>
          <img
            className='object-cover h-96 w-96'
            src={file.preview}
            onLoad={() => { URL.revokeObjectURL(file.preview) }}
          />
        </div>
      </div>
    ));
  
    useEffect(() => {

      return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);
  
    return (
      <section className="bg-black text-white grid h-screen justify-items-center">
        <div  {...getRootProps({className: 'dropzone p-12'})}>
          <input id="image-input" {...getInputProps()} />
          <p className='text-2xl p-20 border-dashed border-8 border-sky-500'>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside className='flex flex-row space-x-8'>
          {thumbs}
        </aside>
        <button className='bg-slate-200 text-black text-3xl font-bold rounded-xl h-12 px-4'>
            Submit
        </button>
      </section>
      
    );
}
