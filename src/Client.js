import DctList from './components/DctList';
import DoctorProfile from './components/DoctorProfile';
import NavBar from './components/NavBar';

const Client = () => {
    return (
        <div className='client'>
            <NavBar/>
            {/*<DctList/>*/}
            <DoctorProfile/>
        </div>
    );
};

export default Client;