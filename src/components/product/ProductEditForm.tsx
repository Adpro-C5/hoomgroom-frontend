"use client"
import productedit from '@/lib/product/productedit';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { Select, SelectProps } from 'antd';
import { redirect, RedirectType } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function ProductEditForm({ id, filePath }: any) {
  const param: string = id
  const oldFilePath: string = filePath 
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([] as string[]);
  const [price, setPrice] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState('')
  const [imageFile, setImageFile] = useState('' as any)
  const [errors, setErrors] = useState({} as any);
  const [isFormValid, setIsFormValid] = useState(false);

  const options: SelectProps['options'] = [];
  options.push(
    {value: 'kursi', label: 'kursi'}, 
    {value: 'meja', label: 'meja'}, 
    {value: 'penyimpanan', label: 'penyimpanan'}, 
    {value: 'dekorasi', label: 'dekorasi'}, 
    {value: 'ranjang', label: 'ranjang'}, 
  )

  useEffect(() => {
    validateForm();
  }, [name, description, price, categories, discountedPrice, imageFile]);

  const validateForm = () => {
    let errors: any = {};

    if (!name) {
      errors.name = 'Name is required'
    } else if (!/[A-Z0-9]/.test(name)) {
      errors.name = 'Name have to be alphanumeric with capital letters'
    }

    if (!description) {
      errors.description = 'Description is required'
    }

    if (!price) {
      errors.price = 'Minimum Purchase is required'
    } else if (!/[0-9]+\.+[0-9]/.test(price)) {
      errors.price = 'Minimum Purchase have to be a float'
    }

    if (discountedPrice && (!/[0-9]+\.+[0-9]/.test(discountedPrice))) {
      errors.discountedPrice = 'Minimum Purchase have to be a float'
    }

    if (categories.length === 0) {
      errors.categories = 'You need to pick at least 1 categories/tags'
    }

    if (!imageFile) {
      errors.imageFile = 'An image is required'
    } else if (!imageFile.name.endsWith('.png') && 
      !imageFile.name.endsWith('.jpg') && 
      !imageFile.name.endsWith('.jpeg') &&
      !imageFile.name.endsWith('.gif')) {
      errors.imageFile = 'File needs to be a png, jpg, or gif'
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0)
  }

  const handleImageChange = () => {
    const fileInput = document.getElementById("imageFile") as HTMLInputElement
    const files: FileList | null = fileInput.files
    if (!files) {
      return
    } else {
      const file = files[0];
      setImageFile(file)
    }
  }

  const handleSubmit = () => {
    if (!isFormValid) {
      alert("Form content is invalid")
    } else {
      const formData = new FormData()
      formData.append('file' ,imageFile)
      
      const id = param

      const filename = id + "-" + Date.now() + "." +
      imageFile.name.substring(
        imageFile.name.lastIndexOf(".") + 1,
        imageFile.name.length
      );;
      formData.append('fileName', filename)

      const deleteFormData = new FormData
      deleteFormData.append('filePath', oldFilePath)

      alert(oldFilePath)
      fetch('/api/deleteUpload/', {
        method: 'POST',
        body: deleteFormData
      }).then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));

      fetch('/api/upload', {
        method: 'POST',
        body: formData
      }).then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));

      productedit(id, name, description, categories, filename, price, discountedPrice);
      
      redirect("/product/", RedirectType.push)
    }
  }

  return (
    <div className='bg-slate-100'>
      <form action={handleSubmit} method="post">
        <div className='p-2'>
          <label htmlFor="name">Product Name :</label>
          <input type="text" id='name' placeholder='  Name'
          value={name} onChange={(e) => setName(e.target.value)}/>
          {errors.name && <p className='text-red-300' >{errors.name}</p>}
        </div>
        <div className='p-2'>
          <label htmlFor="description">Product Description :</label>
          <input type="text" id='description' placeholder='  Description' 
          value={description} onChange={(e) => setDescription(e.target.value)}/>
          {errors.description && <p className='text-red-300' >{errors.description}</p>}
        </div>
        <div className='p-2'>
        <label htmlFor="categories">Product Categories :</label>
          <Select 
            style={{ width: '15%' }}
            id='categories'  
            value={categories}
            placeholder= '  Or Tags'
            onChange={(e) => setCategories(e)}
            options={options}
            mode='multiple'
          />
          {errors.categories && <p className='text-red-300' >{errors.categories}</p>}
        </div>
        <div className='p-2'>
          <label htmlFor="price">Product Price :</label>
          <input type="text" id='price' placeholder='  Price' 
          value={price} onChange={(e) => setPrice(e.target.value)}/>
          {errors.price && <p className='text-red-300' >{errors.price}</p>}
        </div>
        <div className='p-2'>
          <label htmlFor="discountedPrice">Product Discounted Price :</label>
          <input type="text" id='discountedPrice' placeholder='  discountedPrice' 
          value={discountedPrice} onChange={(e) => setDiscountedPrice(e.target.value)}/>
          {errors.discountedPrice && <p className='text-red-300' >{errors.discountedPrice}</p>}
        </div>
        <div className='p-2'>
          <label htmlFor="imageFile">Product Image :</label>
          <input type="file" id="imageFile"  onChange={handleImageChange} />
          {errors.imageFile && <p className='text-red-300' >{errors.imageFile}</p>}
        </div>
        <div className='p-2'>
          <button className='p-2 border rounded-lg border-spacing-2 bg-sky-200' type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}
