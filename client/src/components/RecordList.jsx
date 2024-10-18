import {useEffect, useState, useContext} from "react";
import {CountryContext} from './CountryContext';
import './../App.css'

const Record = ({record, isSelected, onClick}) => {
    const {setCountryCodes} = useContext(CountryContext);

    const handleClick = () => {
        if (record.countryCodes !== undefined) {
            const transformedData = Object.entries(record.countryCodes).map(([key, value]) => {
                return {code: value};
            });
            setCountryCodes(transformedData);
        }
        onClick();
    };

    return (
        <li
            className='flex justify-between gap-x-6 py-4 px-2 border-gray-200 border-t cursor-pointer hover:bg-gray-50'
            onClick={handleClick}
        >
            <div className="flex w-1/2 gap-x-4">
                <img
                    className={`flex-none object-cover overflow-hidden rounded bg-gray-500 transition-all duration-300 ${isSelected ? 'h-12 w-12 md:h-16 md:w-16 xl:h-24 xl:w-24' : 'h-12 w-12'}`}
                    src={record.imageUrl}
                    alt={Object.values(record.latinNames).join(', ')}
                />
                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                        {record.commonNames && typeof record.commonNames === 'object' && Object.entries(record.commonNames).length > 0 ? (
                            Object.entries(record.commonNames).slice(0, 1).map(([key, value]) => (
                                <span key={0}>
                                    {value}
                                </span>
                            ))
                        ) : (
                            Object.entries(record.latinNames).map(([key, value]) => (
                                <span key={0}>
                                    {value}
                                </span>
                            ))
                        )}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {record.commonNames && typeof record.commonNames === 'object' && Object.entries(record.commonNames).length > 1 ? (
                            Object.entries(record.commonNames).slice(1).map(([key, value], index) => (
                                <span key={index}>
                                    {value}
                                    {index < Object.entries(record.commonNames).length - 2 ? ', ' : ''}
                                </span>
                            ))
                        ) : null}
                    </p>
                </div>
            </div>
            <div className="w-1/2 flex-auto text-right">
                <p className="italic text-sm leading-6 text-gray-900">
                    {record.latinNames && typeof record.latinNames === 'object' && Object.entries(record.latinNames).length > 1 ? (
                        Object.entries(record.latinNames).map(([key, value], index) => (
                            <span key={index}>
                                {value}
                                {index < Object.entries(record.latinNames).length - 1 ? ', ' : ''}
                            </span>
                        ))
                    ) : (
                        Object.entries(record.latinNames).map(([key, value]) => (
                            <span key={0}>
                                {value}
                            </span>
                        ))
                    )}
                </p>
                <p className="mt-1 text-xs leading-5 font-light text-gray-500">
                    {record.countryCodes && typeof record.countryCodes === 'object' ? (
                        Object.entries(record.countryCodes)
                            .slice(0, 7)
                            .map(([key, value], index, array) => (
                                <span key={index}>
                                    {value}
                                    {index < array.length - 1 ? ', ' : ''}
                                </span>
                            ))
                    ) : null}
                    {record.countryCodes && Object.entries(record.countryCodes).length > 7 && '...'}
                </p>
            </div>
        </li>
    );
};


export default function RecordList() {
    const [records, setRecords] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 7;
    const [selectedRecordId, setSelectedRecordId] = useState(null);
    const [selectedButton, setSelectedButton] = useState(null);
    const URL = import.meta.env.VITE_PROD_DB_URL;

    // Fetch records from the database
    useEffect(() => {
        async function getRecords() {
            try {
                const response = await fetch(`${URL}`);
                if (!response.ok) {
                    throw new Error(`An error occurred: ${response.statusText}`);
                }
                const fetchedRecords = await response.json();

                // Sort the records by first latinNames (case-insensitive)
                const sortedRecords = fetchedRecords.sort((a, b) => {
                    const latinNamesA = Object.values(a.latinNames || {})[0]?.toLowerCase() || '';
                    const latinNamesB = Object.values(b.latinNames || {})[0]?.toLowerCase() || '';
                    return latinNamesA.localeCompare(latinNamesB);
                });

                setRecords(sortedRecords);
            } catch (error) {
                console.error(error.message);
            }
        }

        getRecords();
    }, []);

    const handleRecordClick = (recordId) => {
        if (selectedRecordId === recordId) {
            setSelectedRecordId(null);
        } else {
            setSelectedRecordId(recordId);
        }
    };

    const totalPages = Math.ceil(records.length / recordsPerPage);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

    function recordList() {
        return currentRecords.length > 0 ? (
            currentRecords.map((record) => (
                <Record
                    record={record}
                    key={record._id}
                    isSelected={record._id === selectedRecordId}
                    onClick={() => handleRecordClick(record._id)}
                />
            ))
        ) : (
            <p>No records available.</p>
        );
    }

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <ul role="list" className="divide-y sm:px-0 md:px-2">
                <li className="flex justify-between gap-x-6 border-gray-100">
                    <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto">
                            <h3 className="sm:text-md md:text-lg font-semibold text-gray-900">Image</h3>
                        </div>
                        <div className="min-w-0 flex-auto">
                            <h3 className="sm:text-md md:text-lg font-semibold text-gray-900">Common Names</h3>
                        </div>
                    </div>
                    <div className="min-w-0 flex-auto text-right">
                        <h3 className="sm:text-md md:text-lg font-semibold text-gray-900">Origin</h3>
                    </div>
                </li>
            </ul>

            <div className="flex-auto sm:h-500px md:min-h-[650px] sm:px-0 md:px-2">
                {recordList()}
            </div>

            <div className="flex flex-col py-6 items-center">
                <span className="text-sm text-gray-700 dark:text-gray-400">
                    Showing <span
                    className="font-semibold text-gray-900 dark:text-white">{indexOfFirstRecord + 1}</span> to <span
                    className="font-semibold text-gray-900 dark:text-white">{Math.min(indexOfLastRecord, records.length)}</span> of <span
                    className="font-semibold text-gray-900 dark:text-white">{records.length}</span> Entries
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                    <button
                        className={`flex items-center justify-center px-3 h-8 text-sm font-medium text-white rounded-s ${
                            selectedButton === 'prev' ? 'bg-emerald-700' : 'bg-emerald-600'
                        } hover:bg-emerald-700`}
                        onClick={() => {
                            setSelectedButton('prev');
                            prevPage();
                        }}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    <button
                        className={`flex items-center justify-center px-3 h-8 text-sm font-medium text-white rounded-e ${
                            selectedButton === 'next' ? 'bg-emerald-700' : 'bg-emerald-600'
                        } hover:bg-emerald-700`}
                        onClick={() => {
                            setSelectedButton('next');
                            nextPage();
                        }}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}
