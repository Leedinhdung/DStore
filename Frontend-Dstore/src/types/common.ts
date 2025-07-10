import { ApiStatusCode } from "@/constants/apiStatus"

export interface IResponse {
    message: string
    data: []
    status: ApiStatusCode
}