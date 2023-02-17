import uploadImage from "@/modules/daybook/helpers/uploadImage"
import axios from "axios"

describe('Pruebas en el uploadImage', () => {
    test('debe de cargar un archivo y retorna URL', async() => {
        const { data } = await axios.get('https://res.cloudinary.com/dvs0c3yjd/image/upload/v1673975966/cld-sample.jpg', {
            responseType: 'arraybuffer'
        })

        const file = new File([ data ], 'foto.jpg' )

        const url = await uploadImage( file )

        expect( typeof url ).toBe('string')
    })  
})
