export default class DateTime {
  public static formatTime = (d: Date | string | null) => {
    if (!d) {
      return ''
    }
    if (typeof d === 'string') {
      d = new Date(d)
    }
    const year = d.getFullYear()
    const month = DateTime.pad(d.getMonth() + 1)
    const day = DateTime.pad(d.getDate())
    const hour = DateTime.pad(d.getHours())
    const min = DateTime.pad(d.getMinutes())
    const sec = DateTime.pad(d.getSeconds())
    return `${year}-${month}-${day} ${hour}:${min}:${sec} GMT`
  }
  public static dateOnly = (d: Date | string | null) => {
    if (!d) {
      return ''
    }
    if (typeof d === 'string') {
      d = new Date(d)
    }
    const year = d.getFullYear()
    const month = DateTime.pad(d.getMonth() + 1)
    const day = DateTime.pad(d.getDate())
    return `${year}-${month}-${day}`
  }
  private static pad = (v: number) => {
    return v < 10 ? '0' + v : v
  }
}
