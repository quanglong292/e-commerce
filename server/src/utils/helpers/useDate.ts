import { TIME_FORMAT } from './../constant';
import dayjs from "dayjs"

export default () => {
    const getCurrent = (): string => dayjs().format(TIME_FORMAT)
    const format = (date: string): string => {
        const isValid = dayjs(date).isValid()
        if (!isValid) throw "Invalid date for format"
        
        return dayjs(date).format(TIME_FORMAT)
    }

    return {getCurrent, format}
}