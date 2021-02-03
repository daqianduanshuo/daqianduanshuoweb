import moment from 'moment'

export function transTime (time:string){
   let curtime =  moment(time,'YYYY-MM-DD HH:mm:ss')
   return curtime.format('YYYY.MM.DD')
}