import React from 'react';

export const LoginCard = (props) => {
    const preventCopyPaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        alert("Copying and pasting is not allowed!")
      }
    return (
        <section className='bg-slate-200 rounded-lg text-zinc-800 py-8 px-8'>
            <h1 className='text-3xl font-bold px-4'>Log In</h1>
            <section className='flex flex-col justify-center px-4'>
                <div className='flex flex-col justify-center py-8'>
                    <label htmlFor="" className='text-xl py-2'>Username</label>
                    <input type="text"
                    className='username-input rounded-lg p-2'
                    onCopy={(e) => preventCopyPaste(e)}  
                    onPaste={(e) => preventCopyPaste(e)}  
                    onCut={(e) => preventCopyPaste(e)}
                    />

                    <label htmlFor="" className='text-xl py-2'>Password</label>
                    <input type="text" 
                    className='password-input rounded-lg p-2'
                    onCopy={(e) => preventCopyPaste(e)}  
                    onPaste={(e) => preventCopyPaste(e)}  
                    onCut={(e) => preventCopyPaste(e)}                 
                    />
                </div>
                <button className='bg-stone-900 rounded-xl text-xl font-bold p-2 text-slate-200'>Log In</button>
            </section> 
        </section>
    )
}