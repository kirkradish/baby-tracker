import { useRef } from 'react'

export default function Input() {
  const inputHeader = useRef();
  
  return <div className="input-group input-group__header">
    <label>Header</label>
    <input ref={inputHeader} type="text" placeholder=" " />
</div>
}