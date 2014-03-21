
//this is just a test
// This test returns undefined, so it's practicaly useless, because AJAX CRUD
//actions do not return values - they manipulate the dom and we don't test it with Jasmine.
describe("cards ajax",function(){
  it("addGroups",function(){
    expect(addGroups()).toBe(undefined);
  });
});