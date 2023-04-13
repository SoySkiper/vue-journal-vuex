import 'setimmediate'
import cloudinary from 'cloudinary'
import axios from "axios"

import uploadImage from "@/modules/daybook/helpers/uploadImage"

cloudinary.config({
    cloud_name: 'dvs0c3yjd',
    api_key: '975156483416217',
    api_secret: 'LF_tce28W2e_ewNLcsyTDr-Wi1I'
})

describe('Pruebas en el uploadImage', () => {
    test('debe de cargar un archivo y retorna URL', async () => {
        const { data } = await axios.get('https://res.cloudinary.com/dvs0c3yjd/image/upload/v1673975966/cld-sample.jpg', {
            responseType: 'arraybuffer'
        })

        const file = new File([data], 'foto.jpg')

        const url = await uploadImage(file)

        expect(typeof url).toBe('string')

        //Tomar el ID

        const segments = url.split('/')
        const imageId = segments[segments.length - 1].replace('.jpg', '')
        // cloudinary.v2.api.delete_resources( imageId, {}, () => {
        // })
        const { deleted } = await cloudinary.v2.api.delete_resources(imageId)

        // Nos aseguramos de que la imagen haya sido eliminada
        // para no crear archivos basura en cloudinary
        expect(deleted[imageId]).toBe('deleted')
    })
})
