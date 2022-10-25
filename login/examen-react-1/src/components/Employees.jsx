import React, { useEffect, useState } from 'react';

import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Name',
        selector: row => row.last_name,
    },
    {
        name: 'Last Name',
        selector: row => row.name,
    },
    {
        name: 'Birthday',
        selector: row => row.birthday,
    }
];

export const Employees = () => {
    const preventCopyPaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        alert("Copying and pasting is not allowed!")
      }

      const [employees, setEmployees] = useState();

      const getApiData = async () => {
        const response = await fetch(
          "https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/:rodrigo_montoya"
        ).then((response) => response.json());
            
        console.log(response.data.employees)
 
        setEmployees(response.data.employees);
      };

      useEffect(() => {
        getApiData();
      }, []);



    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);

    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = employees.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else{
            setFilteredResults(employees)
        }
    }

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/:rodrigo_montoya", {
              method: "POST",
              headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                name: lastName,
                last_name: name,
                birthday: birthday,
              }),
            });
            if (res.status === 200) {
              setName("");
              setLastName("");
              setBirthday("");
              setMessage("Employee added successfully");
              getApiData();
            } else {
              setMessage("Some error occured");
            }
          } catch (err) {
            console.log(err);
          }
        };
    
    
    return (
        <div className="bg-black  h-screen py-8 text-white ">
            <section className='flex flex-col space-y-4 py-4 items-center'>
                <h2 className='text-3xl font-bold'>Add New User</h2>
                <form className='flex flex-col space-y-4 py-4 items-center' onSubmit={handleSubmit} action="">
                    <input className='p-2 px-4 rounded-lg text-black'
                    required
                    type="text"
                    value={name}
                    placeholder='Name'
                    onChange={(e) => setName(e.target.value)}
                    />
                    <input className='p-2 px-4 rounded-lg text-black'
                    required
                    type="text"
                    value={lastName}
                    placeholder='Lastname'
                    onChange={(e) => setLastName(e.target.value)}
                    />
                    <input className='p-2 px-4 rounded-lg text-black'
                    required
                    type="date"
                    value={birthday}
                    placeholder='Birthday'
                    onChange={(e) => setBirthday(e.target.value)}
                    />
                    <button type='submit' className='text-3xl font-bold text-black py-2 px-8 rounded-xl bg-slate-200'>Submit</button>
                    <div className="message">{message ? <p>{message}</p> : null}</div>
                </form>

            </section>
            <section className='w-screen px-16'>
            <input type="text" className='text-black p-3 mb-4 rounded-lg ' placeholder='Search' onChange={(e) => searchItems(e.target.value)}/>
        {searchInput.length > 1 ?(
            <DataTable
            columns={columns}
            data={filteredResults}
            pagination
            />
          ):(        
          <DataTable
            columns={columns}
            data={employees}
            pagination
            />
          )}
            </section>
      </div>
    )
}

