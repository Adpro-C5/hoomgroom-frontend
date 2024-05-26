"use client"
import productadd from '@/lib/product/productadd';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { redirect, RedirectType } from 'next/navigation';
import { Router } from 'next/router';
import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid';

export default function ProductAddForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([] as string[]);
  const [price, setPrice] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState('')
  const [imageFile, setImageFile] = useState('' as any)
  const [errors, setErrors] = useState({} as any);
  const [isFormValid, setIsFormValid] = useState(false);

  const options = [{value: 'kursi', label: 'kursi'}, {value: 'meja', label: 'meja'}, {
    value: 'lemari', label: 'lemari'}, {value: 'sofa', label: 'sofa'}, {value: 'rak', label: 'rak'}, {
    value: 'kayu', label: 'kayu'}, {value: 'kaca', label: 'kaca'}, {value: 'marmer', label: 'marmer'}, {
    value: 'keramik', label: 'keramik'}, {value: 'exotic', label: 'exotic'}, {
    value: 'karpet', label: 'karpet'}, {value: 'dinding', label: 'dinding'}, {value: 'pot', label: 'pot'}
  ]
  

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
      
      const id = v4()

      const filename = id + "-" + Date.now() + "." +
      imageFile.name.substring(
        imageFile.name.lastIndexOf(".") + 1,
        imageFile.name.length
      );;
      formData.append('fileName', filename)

      fetch('/api/upload', {
        method: 'POST',
        body: formData
      }).then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
      productadd(id, name, description, categories, filename, price, discountedPrice);
      
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
          <label htmlFor="categories">Product Description :</label>
          <Listbox value={categories} onChange={(e) => setCategories(e)} multiple>
            <ListboxButton>{categories.map((category) => category).join(', ')}</ListboxButton>
            <ListboxOptions anchor="bottom">
              {options.map((option) => (
                <ListboxOption key={option.value} value={option.value} className="data-[focus]:bg-blue-100">
                  {option.label}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Listbox>
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
