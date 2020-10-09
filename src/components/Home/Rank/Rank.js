import React from 'react'; 

const Rank = ({ name, entries }) => {
    return (
        <div>
            <div className='white f4'>
                {`${name}, your current rank is...`}
                    <div className='white f2'>
                        {entries}
                    </div>
            </div>

            

        </div>
    );
}

export default Rank; 