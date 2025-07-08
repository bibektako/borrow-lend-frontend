import { useState } from "react"
import { registerUserService } from "../services/authService"

export const useRegisterUser = ()=>{
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    const register = async (fromData) =>{
        setIsLoading(true)
        setError(null)
        setData(null)

        try {
            const response = await registerUserService(fromData)
            setData(response)
            return response
        } catch (err) {
            setError(err)
            return null
        }
        finally{
            setIsLoading(false)
        }
    }
    return {
        register,
        isLoading,
        data,
        error
    }
}