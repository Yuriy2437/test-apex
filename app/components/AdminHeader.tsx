import { credentials } from '../../lib/credentials';

export default function AdminHeader({ company }: { company: string }) {
  const cred = credentials.find((c) => c.company === company);
  return (
    <div
      className='admin-header'
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '2rem 3rem 1rem 3rem',
      }}
    >
      <h2
        style={{
          color: '#FFD700',
          fontWeight: 'bold',
          fontSize: '2rem',
          margin: 0,
        }}
      >
        {cred?.companyName}
      </h2>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          id='create-employee-btn'
          style={{
            background: 'red',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            padding: '0.7rem 1.7rem',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Create an Employee
        </button>
        <button
          id='register-employees-btn'
          style={{
            background: 'red',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            padding: '0.7rem 1.7rem',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Save Employees
        </button>
      </div>
    </div>
  );
}
