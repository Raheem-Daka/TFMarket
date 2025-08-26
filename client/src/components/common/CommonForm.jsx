import React from 'react'
import { registerFormControls } from '@/config'
import { Label } from '../ui/label';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';
import { Textarea } from '../ui/textarea';

export default function CommonForm({ formControls, formData, setFormData, onSubmit, buttonText }) {

  function renderInputByComponentType(getControlItem) {
    let element = null;
    const value = formData[
      getControlItem.name
    ] || ''

    switch(getControlItem.componentType) {

      case 'input':
        element = ( <input 
        name={getControlItem.name}
        placeholder={getControlItem.placeholder}
        id={getControlItem.name}
        type={getControlItem.type}
        value={value}
        onChange={e => setFormData({
          ...formData,
          [getControlItem.name] : e.target.value,
        })}
        />
      );
      break;

      case 'select':
        element = ( 
          <select 
          onChange={(value) => setFormData({
            ...formData,
            [getControlItem.name] : value
          })}
          value={value}>
            <SelectTrigger className='w-ful'>
              <SelectValue placeholder={getControlItem.placeholder} />
           </SelectTrigger>
            <SelectContent>
              {
                getControlItem.options && 
                getControlItem.options.length > 0?
                getControlItem.options.map(optionItem => <SelectItem key={optionItem.id} value={optionItem.id}/>) : null
              }
            </SelectContent>
          </select>
      );
      break;

      case 'textarea':
        element = ( <Textarea 
        name={getControlItem.name}
        placeholder={getControlItem.placeholder}
        id={getControlItem.id}
        value={value}
        />
      );
      break;

      default:
        element = ( <input 
          className='border rounded p-1'
          name={getControlItem.name}
          placeholder={getControlItem.placeholder}
          id={getControlItem.name}
          type={getControlItem.type}
          value={value}
          onChange={e => setFormData({
            ...formData,
            [getControlItem.name] : e.target.value,
          })}
          />
        );
      break;
  
    }
    return element
  }


  return (
    <>
        <form onSubmit={onSubmit} >
            <div className='flex flex-col gap-3'>
              {
                formControls.map((controlItem) => (
                <div className='grid w-full gap-1.5' key={controlItem.name}>
                  <Label className='mb-1'>{controlItem.label}</Label>
                  {
                    renderInputByComponentType(controlItem)
                  }
                </div>
                ))
              }

            </div>
            <button type='submit' className='rounded p-2 text-sm mt-2 w-full bg-gray-300 hover:opacity-80'>{buttonText || 'submit'}</button>
        </form>
    </>
  )
}
