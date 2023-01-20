import daybookRouter from '@/modules/daybook/router/index'

describe('Pruebas en el router module del Daybook', () => {
    test('el router debe de tener esta configuración', async () => {
        expect( daybookRouter ).toMatchObject({
            name: 'daybook',
            component: expect.any( Function ),
            children: [
                {
                    path: '',
                    name: 'no-entry',
                    component: expect.any( Function )
                },
                {
                    path: ':id',
                    name: 'entry',
                    component: expect.any( Function ),
                    props: expect.any( Function )

                }
            ]
        })

        console.log(await daybookRouter.children[0].component())
    })
})