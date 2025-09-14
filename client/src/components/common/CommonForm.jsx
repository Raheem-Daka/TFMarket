import React from 'react';
import { Label } from '../ui/label';
import { 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue, 
  Select, 
  SelectGroup,
  SelectLabel
} from '../ui/select'; // Import Select from Radix UI
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

export default function CommonForm({ 
  formControls, 
  formData, 
  setFormData, 
  onSubmit, 
  buttonText,
 }) {

  function renderInputByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || '';

    switch(getControlItem.componentType) {

      case 'input':
        element = (
          <input 
            key={getControlItem.name} // Key for dynamic rendering
            name={getControlItem.name}
            className='rounded border p-1'
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            required={true}
            onChange={(e) => setFormData({
              ...formData,
              [getControlItem.name]: e.target.value,
            })}
          />
        );
        break;

      case 'select':
        element = (
          <Select
            value={value}
            onValueChange={(newValue) =>
              setFormData({
                ...formData,
                [getControlItem.name]: newValue,
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {/* ✅ Only render SelectLabel if provided */}
                {getControlItem.labelInsideSelect && (
                  <SelectLabel>{getControlItem.labelInsideSelect}</SelectLabel>
                )}
      
                {getControlItem.options?.map((optionItem) => (
                  <SelectItem
                    key={optionItem.id}
                    value={optionItem.id}
                    className="cursor-pointer w-full bg-white px-3 py-1.5 hover:bg-gray-100 focus:bg-gray-200"
                  >
                    {optionItem.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        );
        break;
        
      case 'textarea':
        element = (
          <Textarea 
            key={getControlItem.name} // Key for dynamic rendering
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id || getControlItem.name}
            value={value}
            onChange={(e) => 
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );
        break;

      default:
        element = (
          <input 
            key={getControlItem.name} // Key for dynamic rendering
            className="border rounded p-1"
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(e) => 
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );
        break;
    }
    return element;
  }

  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault(); // Prevent default form submission
        onSubmit(e);         // Call the onSubmit handler
      }}>
        <div className="flex flex-col gap-3">
          {
            formControls.map((controlItem) => (
              <div className="grid w-full gap-1.5" key={controlItem.name}>
                <Label className="mb-1" htmlFor={controlItem.name}>{controlItem.label}</Label>
                {renderInputByComponentType(controlItem)}
              </div>
            ))
          }
        </div>
        <Button 
          type="submit" 
          className="rounded p-2 text-sm mt-2 w-full bg-blue-300 hover:opacity-80"
        >
          {buttonText || 'Submit'}
        </Button>
      </form>
    </>
  );
}
