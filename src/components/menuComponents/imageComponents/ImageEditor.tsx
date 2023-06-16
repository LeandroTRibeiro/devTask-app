import React, { useRef, useState, useEffect } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { FormErrMsg } from '../../formComponents/FormErrMsg';


interface ImageEditorProps {
  HandlerNewAvatar: (image: Blob) => void;
};

const ImageEditor: React.FC<ImageEditorProps> = (Props: ImageEditorProps) => {

  const editorRef = useRef<AvatarEditor | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [formMsg, setFormMsg] = useState('');

  const [imageChange, setImageChange] = useState(false);
  
  useEffect(() => {
    const HandlerMouseWheel = (e: WheelEvent) => {
      const zoomFactor = 0.1;
      e.preventDefault();

        // Detecta se o usuário está rolando para cima ou para baixo
        const delta = Math.sign(e.deltaY);
  
        // Calcula a nova escala com base no fator de zoom
        const newScale = scale + delta * zoomFactor;
  
        // Limita a escala entre 0.1 e 2 (valores arbitrários, ajuste conforme necessário)
        const clampedScale = Math.min(Math.max(newScale, 0.1), 2);
  
        setScale(clampedScale);

    };

    document.addEventListener('wheel', HandlerMouseWheel, { passive: false });

    return () => {
      document.removeEventListener('wheel', HandlerMouseWheel);
    };
  }, [scale]);

  useEffect(() => {

    const dataURLtoBlob = (dataURL: string): Blob => {
      const arr = dataURL.split(',');
      const mime = arr[0].match(/:(.*?);/)?.[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    };

    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const editedImage = canvas.toDataURL();
      const file = dataURLtoBlob(editedImage);
      Props.HandlerNewAvatar(file);

    }
  }, [imageChange, scale]);

  const IsImage = (file: File) => {
    const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return acceptedImageTypes.includes(file.type);
  }

  const HandlerImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0 && IsImage(event.target.files[0])) {
      setFormMsg('');
      const file = event.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
    } else {
      setFormMsg('Imagem Inválida');
    }
  };

  return (
    <div className='fade-opacity w-full h-full flex flex-col justify-between items-center'>
      {selectedImage && (
        <div className=' overflow-hidden' onMouseOut={() => setImageChange(!imageChange)}>
          
          <AvatarEditor
            ref={editorRef}
            image={selectedImage}
            width={250}
            height={250}
            border={25}
            borderRadius={300}
            color={[255, 255, 255, 0.6]}
            scale={scale}
            rotate={0}
            onLoadSuccess={() => setImageChange(!imageChange)}
          />
        </div>
      )}
      <div className={`fade-opacity flex flex-col gap-2 w-full ${selectedImage ? '' : 'h-full justify-center'}`}>
        <span className="text-center font-thin tablet-m:text-sm">Arraste e solte uma imagem abaixo ou clique para selecionar um arquivo!</span>
        <FormErrMsg 
            formErrMsg={formMsg}
            name='Imagem'
        />
        <label title="Arraste e solte uma imagem aqui ou clique para selecionar um arquivo!" className="w-full h-10 rounded-md border border-dashed border-stone-900 dark:border-stone-100 cursor-pointer bg-camera dark:bg-camera-white bg-no-repeat bg-center hover:bg-stone-300/10 transitions">
          <input
            className="opacity-0 hover:hidden w-full h-full border border-purple-700 cursor-pointer"
            id="avatar"
            type="file"
            name="avatar"
            accept="image/*"
            onChange={HandlerImageChange}           
          />
        </label>
      </div>
    </div>
  );
};

export default ImageEditor;
