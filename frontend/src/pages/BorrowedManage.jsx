import { Button } from '@/components/ui/button'
import { formatDate } from '@/constants/formatDate'
import { axiosInstance } from '@/utils/axiosInstance'
import { TimerOff } from 'lucide-react'
import { Timer } from 'lucide-react'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'

const BorrowedManage = () => {
    const [books, setBooks] = useState([])
    const fetchBorrowed  = async () => {
        try {
            const response = await axiosInstance.get('/book/borrowed')
            setBooks(response.data)
        } catch (error) {
            console.error('Error fetching borrowed books:', error)
        }
    }
    const returnBook = async (bookId) => {
        const response = await axiosInstance.post('/book/return', {
            borrowId: bookId,
        })
        if (response.data) {
            toast.success('Book returned successfully')
            await fetchBorrowed()
        }

    }
    useEffect(() => {
        fetchBorrowed()
    }, [])
  return (
    <div className='flex flex-col w-full'>
        <div className="flex flex-wrap wrap w-full justify-between">
            {books.map((book) => (
                <div key={book._id} className="rounded-md relative flex flex-col gap-2 p-2">
                    <img className="w-[350px] rounded-xl h-[450px]" src={book?.book?.image} alt="" />
                   <div className="user-info flex items-center gap-2 justify-between">
                   <div className="flex items-center gap-2">
                   <img className='w-[40px] h-[40px] rounded-full border border-gray-400' src={book?.borrower?.avatar || "/default.jpg"} alt="" />
                   <h1>{book?.borrower?.username}</h1>
                   </div>
                   <div className="flex px-3 py-2 bg-gray-100 rounded-xl border">
                    {formatDate(book?.borrowedAt)}
                   </div>
                   </div>
                    <div className="flex justify-between items-center">
                       <div className={`flex items-center gap-5  px-5 py-2 ${book?.returnedAt ? "bg-green-200" : "bg-gray-100"} text-black rounded-xl border`}>
                       {
                        book.returnedAt? <TimerOff size={"18"} />: <span className='timer w-2 h-2 bg-white rounded'></span>
 
                       }
                       {
                            book.returnedAt ? formatDate(book?.returnedAt) : formatDate(book?.dueDate)
                        }
                       </div>
                    <Button className="w-[150px] rounded-xl py-5  uppercase" onClick={() => returnBook(book?._id)} disabled={book?.returnedAt}>{book?.returnedAt ? "REturned" : "Return"}</Button>
                    </div>
                </div>
            ))}
        </div>
      
    </div>
  )
}

export default BorrowedManage
