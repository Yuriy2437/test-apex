// 'use client';
// import { useEffect, useState } from 'react';
// import type { Employee } from '../../types';

// export default function EmployeeTable({ company }: { company: string }) {
//   const [employees, setEmployees] = useState<Employee[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`/api/employees/${company}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setEmployees(data.employees || []);
//         setLoading(false);
//       });
//   }, [company]);

//   const handleCreate = async () => {
//     const newEmployee = {
//       number: employees.length + 1,
//       firstName: '',
//       lastName: '',
//       position: '',
//       email: '',
//     };
//     const res = await fetch(`/api/employees/${company}`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newEmployee),
//     });
//     const data = await res.json();
//     setEmployees([...employees, { ...newEmployee, _id: data.id }]);
//   };

//   const handleDelete = async (id: string) => {
//     await fetch(`/api/employees/${company}?id=${id}`, { method: 'DELETE' });
//     setEmployees(employees.filter((e) => e._id !== id));
//   };

//   const handleChange = (idx: number, field: keyof Employee, value: string) => {
//     const updated = [...employees];
//     (updated[idx] as any)[field] = value;
//     setEmployees(updated);
//   };

//   const handleRegister = async () => {
//     await fetch(`/api/employees/${company}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(employees),
//     });
//     alert('Сотрудники сохранены!');
//   };

//   useEffect(() => {
//     const createBtn = document.getElementById('create-employee-btn');
//     if (createBtn) createBtn.onclick = handleCreate;
//     const registerBtn = document.getElementById('register-employees-btn');
//     if (registerBtn) registerBtn.onclick = handleRegister;
//   });

//   if (loading)
//     return (
//       <div
//         style={{ color: '#FFD700', fontWeight: 'bold', textAlign: 'center' }}
//       >
//         Загрузка...
//       </div>
//     );

//   return (
//     <div className='admin-container' style={{ margin: '2rem 3rem' }}>
//       {/* Desktop table */}
//       <div
//         className='employee-table-wrapper desktop-table'
//         style={{
//           borderRadius: '10px',
//           border: '1px solid #FFD700',
//           background: 'rgba(0,0,0,0.1)',
//           overflow: 'hidden',
//         }}
//       >
//         {/* Заголовок таблицы */}
//         <table
//           style={{
//             width: '100%',
//             borderCollapse: 'collapse',
//             background: 'transparent',
//             tableLayout: 'fixed',
//           }}
//         >
//           <colgroup>
//             <col
//               style={{ width: '30px', maxWidth: '30px', minWidth: '30px' }}
//             />
//             <col />
//             <col />
//             <col />
//             <col style={{ minWidth: '200px' }} />
//             <col />
//           </colgroup>
//           <thead>
//             <tr>
//               <th style={numberThStyle}>№</th>
//               <th style={stickyThStyle}>Имя</th>
//               <th style={stickyThStyle}>Фамилия</th>
//               <th style={stickyThStyle}>Должность</th>
//               <th style={emailThStyle}>E-mail</th>
//               <th style={stickyThStyle}>Удалить</th>
//             </tr>
//           </thead>
//         </table>
//         {/* Прокручиваемое тело таблицы */}
//         <div
//           style={{
//             maxHeight: '70vh',
//             overflowY: 'auto',
//             width: '100%',
//           }}
//         >
//           <table
//             style={{
//               width: '100%',
//               borderCollapse: 'collapse',
//               background: 'transparent',
//               tableLayout: 'fixed',
//             }}
//           >
//             <colgroup>
//               <col
//                 style={{ width: '30px', maxWidth: '30px', minWidth: '30px' }}
//               />
//               <col />
//               <col />
//               <col />
//               <col style={{ minWidth: '200px' }} />
//               <col />
//             </colgroup>
//             <tbody>
//               {employees.map((emp, idx) => (
//                 <tr key={emp._id || idx}>
//                   <td style={numberTdStyle}>{idx + 1}</td>
//                   <td style={tdStyle}>
//                     <input
//                       value={emp.firstName}
//                       onChange={(e) =>
//                         handleChange(idx, 'firstName', e.target.value)
//                       }
//                       style={inputStyle}
//                     />
//                   </td>
//                   <td style={tdStyle}>
//                     <input
//                       value={emp.lastName}
//                       onChange={(e) =>
//                         handleChange(idx, 'lastName', e.target.value)
//                       }
//                       style={inputStyle}
//                     />
//                   </td>
//                   <td style={tdStyle}>
//                     <input
//                       value={emp.position}
//                       onChange={(e) =>
//                         handleChange(idx, 'position', e.target.value)
//                       }
//                       style={inputStyle}
//                     />
//                   </td>
//                   <td style={emailTdStyle}>
//                     <input
//                       value={emp.email}
//                       onChange={(e) =>
//                         handleChange(idx, 'email', e.target.value)
//                       }
//                       style={inputStyle}
//                     />
//                   </td>
//                   <td style={tdStyle}>
//                     <button
//                       onClick={() => handleDelete(emp._id!)}
//                       className='employee-delete-btn'
//                       style={deleteBtnStyle}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       {/* Mobile list */}
//       <div className='employee-mobile-list'>
//         <table
//           style={{
//             width: '100%',
//             borderCollapse: 'collapse',
//             background: 'transparent',
//           }}
//         >
//           <thead>
//             <tr>
//               <th style={stickyThStyle}>№</th>
//               <th style={stickyThStyle}>Сотрудник</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employees.map((emp, idx) => (
//               <tr key={emp._id || idx}>
//                 <td style={{ ...tdStyle, verticalAlign: 'top', minWidth: 30 }}>
//                   {idx + 1}
//                 </td>
//                 <td style={{ ...tdStyle, padding: 0 }}>
//                   <div
//                     style={{
//                       display: 'flex',
//                       flexDirection: 'column',
//                       gap: '0.3rem',
//                       padding: '0.3rem 0',
//                     }}
//                   >
//                     <div
//                       style={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '0.5rem',
//                       }}
//                     >
//                       <span>Имя</span>
//                       <input
//                         value={emp.firstName}
//                         onChange={(e) =>
//                           handleChange(idx, 'firstName', e.target.value)
//                         }
//                         style={inputStyle}
//                       />
//                     </div>
//                     <div
//                       style={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '0.5rem',
//                       }}
//                     >
//                       <span>Фамилия</span>
//                       <input
//                         value={emp.lastName}
//                         onChange={(e) =>
//                           handleChange(idx, 'lastName', e.target.value)
//                         }
//                         style={inputStyle}
//                       />
//                     </div>
//                     <div
//                       style={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '0.5rem',
//                       }}
//                     >
//                       <span>Должность</span>
//                       <input
//                         value={emp.position}
//                         onChange={(e) =>
//                           handleChange(idx, 'position', e.target.value)
//                         }
//                         style={inputStyle}
//                       />
//                     </div>
//                     <div
//                       style={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '0.5rem',
//                       }}
//                     >
//                       <span>E-mail</span>
//                       <input
//                         value={emp.email}
//                         onChange={(e) =>
//                           handleChange(idx, 'email', e.target.value)
//                         }
//                         style={inputStyle}
//                       />
//                     </div>
//                     <div
//                       style={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '0.5rem',
//                       }}
//                     >
//                       <span>Удалить</span>
//                       <button
//                         onClick={() => handleDelete(emp._id!)}
//                         className='employee-delete-btn'
//                         style={deleteBtnStyle}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// // Стили
// const numberThStyle = {
//   color: '#FFD700',
//   fontWeight: 'bold',
//   fontSize: '1.1rem',
//   padding: '0.6rem',
//   borderBottom: '2px solid #FFD700',
//   background: '#014421',
//   position: 'sticky' as const,
//   top: 0,
//   zIndex: 2,
//   width: '30px',
//   maxWidth: '30px',
//   minWidth: '30px',
// };

// const emailThStyle = {
//   color: '#FFD700',
//   fontWeight: 'bold',
//   fontSize: '1.1rem',
//   padding: '0.6rem',
//   borderBottom: '2px solid #FFD700',
//   background: '#014421',
//   position: 'sticky' as const,
//   top: 0,
//   zIndex: 2,
//   minWidth: '200px',
// };

// const stickyThStyle = {
//   color: '#FFD700',
//   fontWeight: 'bold',
//   fontSize: '1.1rem',
//   padding: '0.6rem',
//   borderBottom: '2px solid #FFD700',
//   background: '#014421',
//   position: 'sticky' as const,
//   top: 0,
//   zIndex: 2,
// };

// const numberTdStyle = {
//   color: '#FFD700',
//   fontWeight: 'bold',
//   padding: '0.5rem',
//   textAlign: 'center' as const,
//   background: 'transparent',
//   width: '30px',
//   maxWidth: '30px',
//   minWidth: '30px',
// };

// const emailTdStyle = {
//   color: '#FFD700',
//   fontWeight: 'bold',
//   padding: '0.5rem',
//   textAlign: 'center' as const,
//   background: 'transparent',
//   minWidth: '200px',
// };

// const tdStyle = {
//   color: '#FFD700',
//   fontWeight: 'bold',
//   padding: '0.5rem',
//   textAlign: 'center' as const,
//   background: 'transparent',
// };

// const inputStyle = {
//   background: 'transparent',
//   color: '#FFD700',
//   fontWeight: 'bold',
//   border: '1px solid #FFD700',
//   borderRadius: '5px',
//   padding: '0.3rem 0.7rem',
//   fontSize: '1rem',
//   width: '100%',
//   boxSizing: 'border-box' as const,
// };

// const deleteBtnStyle = {
//   background: 'red',
//   color: 'white',
//   fontWeight: 'bold',
//   border: 'none',
//   borderRadius: '6px',
//   padding: '0.5rem 1.2rem',
//   cursor: 'pointer',
// };

'use client';
import { useEffect, useState } from 'react';
import type { Employee } from '../../types';

export default function EmployeeTable({ company }: { company: string }) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/employees/${company}`)
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data.employees || []);
        setLoading(false);
      });
  }, [company]);

  const handleCreate = async () => {
    const newEmployee = {
      number: employees.length + 1,
      firstName: '',
      lastName: '',
      position: '',
      email: '',
    };
    const res = await fetch(`/api/employees/${company}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEmployee),
    });
    const data = await res.json();
    setEmployees([...employees, { ...newEmployee, _id: data.id }]);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/employees/${company}?id=${id}`, { method: 'DELETE' });
    setEmployees(employees.filter((e) => e._id !== id));
  };

  const handleChange = (idx: number, field: keyof Employee, value: string) => {
    const updated = [...employees];
    (updated[idx] as any)[field] = value;
    setEmployees(updated);
  };

  const handleRegister = async () => {
    await fetch(`/api/employees/${company}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employees),
    });
    alert('Сотрудники сохранены!');
  };

  useEffect(() => {
    const createBtn = document.getElementById('create-employee-btn');
    if (createBtn) createBtn.onclick = handleCreate;
    const registerBtn = document.getElementById('register-employees-btn');
    if (registerBtn) registerBtn.onclick = handleRegister;
  });

  if (loading)
    return (
      <div
        style={{ color: '#FFD700', fontWeight: 'bold', textAlign: 'center' }}
      >
        Загрузка...
      </div>
    );

  return (
    <div className='admin-container' style={{ margin: '2rem 3rem' }}>
      {/* Desktop table */}
      <div
        className='employee-table-wrapper desktop-table'
        style={{
          borderRadius: '10px',
          border: '1px solid #FFD700',
          background: 'rgba(0,0,0,0.1)',
          overflow: 'hidden',
        }}
      >
        {/* Заголовок таблицы */}
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            background: 'transparent',
            tableLayout: 'fixed',
          }}
        >
          <colgroup>
            <col
              style={{ width: '30px', maxWidth: '30px', minWidth: '30px' }}
            />
            <col />
            <col />
            <col />
            <col style={{ minWidth: '260px', width: '30%' }} />
            <col
              style={{ width: '80px', maxWidth: '100px', minWidth: '65px' }}
            />
          </colgroup>
          <thead>
            <tr>
              <th style={numberThStyle}>№</th>
              <th style={stickyThStyle}>Имя</th>
              <th style={stickyThStyle}>Фамилия</th>
              <th style={stickyThStyle}>Должность</th>
              <th style={emailThStyle}>E-mail</th>
              <th style={deleteThStyle}>Удалить</th>
            </tr>
          </thead>
        </table>
        {/* Прокручиваемое тело таблицы */}
        <div
          style={{
            maxHeight: '70vh',
            overflowY: 'auto',
            width: '100%',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              background: 'transparent',
              tableLayout: 'fixed',
            }}
          >
            <colgroup>
              <col
                style={{ width: '30px', maxWidth: '30px', minWidth: '30px' }}
              />
              <col />
              <col />
              <col />
              <col style={{ minWidth: '260px', width: '30%' }} />
              <col
                style={{ width: '80px', maxWidth: '100px', minWidth: '65px' }}
              />
            </colgroup>
            <tbody>
              {employees.map((emp, idx) => (
                <tr key={emp._id || idx}>
                  <td style={numberTdStyle}>{idx + 1}</td>
                  <td style={tdStyle}>
                    <input
                      value={emp.firstName}
                      onChange={(e) =>
                        handleChange(idx, 'firstName', e.target.value)
                      }
                      style={inputStyle}
                    />
                  </td>
                  <td style={tdStyle}>
                    <input
                      value={emp.lastName}
                      onChange={(e) =>
                        handleChange(idx, 'lastName', e.target.value)
                      }
                      style={inputStyle}
                    />
                  </td>
                  <td style={tdStyle}>
                    <input
                      value={emp.position}
                      onChange={(e) =>
                        handleChange(idx, 'position', e.target.value)
                      }
                      style={inputStyle}
                    />
                  </td>
                  <td style={emailTdStyle}>
                    <input
                      value={emp.email}
                      onChange={(e) =>
                        handleChange(idx, 'email', e.target.value)
                      }
                      style={emailInputStyle}
                    />
                  </td>
                  <td style={deleteTdStyle}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <button
                        onClick={() => handleDelete(emp._id!)}
                        className='employee-delete-btn'
                        style={deleteBtnStyle}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Mobile list */}
      <div className='employee-mobile-list'>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            background: 'transparent',
          }}
        >
          <thead>
            <tr>
              <th style={stickyThStyle}>№</th>
              <th style={stickyThStyle}>Сотрудник</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, idx) => (
              <tr key={emp._id || idx}>
                <td style={{ ...tdStyle, verticalAlign: 'top', minWidth: 30 }}>
                  {idx + 1}
                </td>
                <td style={{ ...tdStyle, padding: 0 }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.3rem',
                      padding: '0.3rem 0',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <span>Имя</span>
                      <input
                        value={emp.firstName}
                        onChange={(e) =>
                          handleChange(idx, 'firstName', e.target.value)
                        }
                        style={inputStyle}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <span>Фамилия</span>
                      <input
                        value={emp.lastName}
                        onChange={(e) =>
                          handleChange(idx, 'lastName', e.target.value)
                        }
                        style={inputStyle}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <span>Должность</span>
                      <input
                        value={emp.position}
                        onChange={(e) =>
                          handleChange(idx, 'position', e.target.value)
                        }
                        style={inputStyle}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <span>E-mail</span>
                      <input
                        value={emp.email}
                        onChange={(e) =>
                          handleChange(idx, 'email', e.target.value)
                        }
                        style={inputStyle}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <span>Удалить</span>
                      <button
                        onClick={() => handleDelete(emp._id!)}
                        className='employee-delete-btn'
                        style={deleteBtnStyle}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Стили
const numberThStyle = {
  color: '#FFD700',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  padding: '0.6rem',
  borderBottom: '2px solid #FFD700',
  background: '#014421',
  position: 'sticky' as const,
  top: 0,
  zIndex: 2,
  width: '30px',
  maxWidth: '30px',
  minWidth: '30px',
};

const emailThStyle = {
  color: '#FFD700',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  padding: '0.6rem',
  borderBottom: '2px solid #FFD700',
  background: '#014421',
  position: 'sticky' as const,
  top: 0,
  zIndex: 2,
  minWidth: '260px',
  width: '30%',
};

const deleteThStyle = {
  color: '#FFD700',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  padding: '0.6rem',
  borderBottom: '2px solid #FFD700',
  background: '#014421',
  position: 'sticky' as const,
  top: 0,
  zIndex: 2,
  width: '80px',
  maxWidth: '100px',
  minWidth: '65px',
};

const stickyThStyle = {
  color: '#FFD700',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  padding: '0.6rem',
  borderBottom: '2px solid #FFD700',
  background: '#014421',
  position: 'sticky' as const,
  top: 0,
  zIndex: 2,
};

const numberTdStyle = {
  color: '#FFD700',
  fontWeight: 'bold',
  padding: '0.5rem',
  textAlign: 'center' as const,
  background: 'transparent',
  width: '30px',
  maxWidth: '30px',
  minWidth: '30px',
};

const emailTdStyle = {
  color: '#FFD700',
  fontWeight: 'bold',
  padding: '0.5rem',
  textAlign: 'center' as const,
  background: 'transparent',
  minWidth: '260px',
  width: '30%',
};

const deleteTdStyle = {
  color: '#FFD700',
  fontWeight: 'bold',
  padding: '0.5rem',
  textAlign: 'center' as const,
  background: 'transparent',
  width: '80px',
  maxWidth: '100px',
  minWidth: '65px',
};

const tdStyle = {
  color: '#FFD700',
  fontWeight: 'bold',
  padding: '0.5rem',
  textAlign: 'center' as const,
  background: 'transparent',
};

const inputStyle = {
  background: 'transparent',
  color: '#FFD700',
  fontWeight: 'bold',
  border: '1px solid #FFD700',
  borderRadius: '5px',
  padding: '0.3rem 0.7rem',
  fontSize: '1rem',
  width: '100%',
  boxSizing: 'border-box' as const,
};

// const emailInputStyle = {
//   ...inputStyle,
//   width: '125%', // шире обычного поля на 25%
// };

const emailInputStyle = {
  ...inputStyle,
  width: '90%', // теперь ширина инпута E-mail составляет 70% от ширины ячейки
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'block',
};

const deleteBtnStyle = {
  background: 'red',
  color: 'white',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '6px',
  padding: '0.5rem 1.2rem',
  cursor: 'pointer',
  minWidth: '60px',
  maxWidth: '80px',
};
