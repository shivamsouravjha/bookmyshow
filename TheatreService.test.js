import SlotService  from './app/Service/slotService';  // Adjust the import according to your file structure

describe('TheatreService', () => {
  let slotService;

  beforeEach(() => {
    slotService = new SlotService();
  });


  describe('addTheatre method', () => {
    it('should return the correct theatre info', async () => {
      const args = {}; 
      const expectedResponse = {
        "as": 12,
        "Sas": {
          "SA": "ASASASASAS",
          "12": 12,
        },
        "asdsad": {
          "ASDSA": "ASDASDASD",
        }
      };

      const response = await slotService.addTheatre(args);
      expect(response).toEqual(expectedResponse);
    });
  });
});
