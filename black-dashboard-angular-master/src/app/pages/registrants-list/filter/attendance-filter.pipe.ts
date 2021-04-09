import { Attendance } from '../../../shared/attendance.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'attendanceFilter'
})
export class AttendanceFilterPipe implements PipeTransform {

  transform(attendance: Attendance[], searchTerm: string): Attendance[] {
    if(!attendance || !searchTerm)
    return attendance;

    return attendance.filter(attendance =>
      attendance.participant.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      attendance.temperature.toString().includes(searchTerm.toLocaleLowerCase())
    )
  }

}
