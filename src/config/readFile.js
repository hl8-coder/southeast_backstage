import XLSX from 'xlsx'

export default class ReadFile {
  static readExcel = (file) => {
    if (file.length < 1) {
      alert('Please select a file')
      return false
    } else if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
      alert('Please select .xls, .xlsx file')
      return false
    }
    if (window.FileReader) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = e.target.result
          const workBook = XLSX.read(data, {
            type: 'binary'
          })
          const wsName = workBook.SheetNames[0]
          const ws = XLSX.utils.sheet_to_json(workBook.Sheets[wsName])
          let arr = []
          for (let i = 0; i < ws.length; i++) {
            let sheetData = ws[i].Member_code
            arr.push(sheetData)
          }
          return arr
        } catch (e) {
          console.log(e.message)
        }
      }
      reader.readAsBinaryString(file)
    } else {
      alert('Please update your Browser')
    }
  }
}
