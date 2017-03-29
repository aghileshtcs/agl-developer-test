describe('Pets App Tester', function () {
    beforeEach(module('petInfo'));

    describe('Controller', function () {
        var _petCtrl;
        beforeEach(inject(function ($controller) {
            _petCtrl = $controller('PetInfoController');
        }));
        it('PetInfoController should have method - loadPetDetails', function () {
            expect(_petCtrl.loadPetDetails).toBeDefined();            
        });
        it('Checks the pet type Filter', function () {
            var petArr = [{ name: 'A', type: 'Cat' }, { name: 'B', type: 'Cat' }, { name: 'C', type: 'Dog' }];
            var expectedDogArr = [{ name: 'C', type: 'Dog' }];
            var expectedCatArr = [{ name: 'A', type: 'Cat' }, { name: 'B', type: 'Cat' }];
            var unExpectedCarArr = [{ name: 'A', type: 'Cat' }];
            expect(JSON.stringify(_petCtrl.filterPets(petArr, 'Cat'))).toBe(JSON.stringify(expectedCatArr)); //pass
            expect(JSON.stringify(_petCtrl.filterPets(petArr, 'Dog'))).toBe(JSON.stringify(expectedDogArr)); //pass

            //expect(JSON.stringify(_petCtrl.filterPets(petArr, 'Cat'))).toBe(JSON.stringify(unExpectedCarArr)); //fail

        });
    });

    describe('Service', function () {
        var _petService;
        beforeEach(inject(function (_petService_) {
            _petService = _petService_;
        }));
        it('petService Should exists', function () {
            expect(_petService).toBeDefined();
        });

        it('petService Should have a method getPets', function () {
            expect(_petService.getPets).toBeDefined();
        });
    });
});