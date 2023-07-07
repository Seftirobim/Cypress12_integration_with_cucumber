import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

When ("User select sort product by {string}",(slc) =>{
    cy.get("select[class='product_sort_container']").select(slc)
})

Then("System should display a sort product by {string}",(slc) =>{
    let prodNameList = [] // menyimpan hasil logic
    let prodNameListEl = [] // menyimpan dari element
    cy.get(".inventory_item_name").each(($v) =>{
        prodNameList.push($v.text())
        prodNameListEl.push($v.text())
    })
    // Dijadikan default sorting dulu untuk sort by name
    cy.wrap(prodNameList)
        .then(arr => arr.sort())
        .then(sortedArr =>{
            // cy.wrap(sortedArr).as('defaultSortName')

            // Assert disini membandingkan 2 array
            if (slc == "Name (A to Z)")
                expect(sortedArr).to.deep.eq(prodNameListEl)
                //cy.wrap(sortedArr).should('eq',prodNameListEl)

            // Kalo yang di selectnya 'Name (Z to A)' maka bandingkannya hasil logic sort "reversed" dengan array di element    
            else if (slc == "Name (Z to A)")
                expect(sortedArr.sort().reverse()).to.deep.eq(prodNameListEl)
                // cy.wrap(sortedArr.sort().reverse()).should('eq',prodNameListEl) 
        })
  

    // Hal yang sama untuk membandingkan sort by price tapi disini arraynya harus di
    // konversi dulu ke float 
    let priceList = [] // Menyimpan hasil logic
    let priceListEl = [] // Menyimpan dari element
    cy.get(".inventory_item_price").each(($v) =>{
        priceList.push($v.text());
        priceListEl.push($v.text());
    })
    // Assisted by chatGPT, untuk mengkonversi dan mensortir array price yg mengandung '$'
    cy.wrap(priceList)
    .then(arr => arr.sort((a, b) => {
      const numA = parseFloat(a.replace('$', ''));
      const numB = parseFloat(b.replace('$', ''));
      
      if (slc == "Price (low to high)")  
        return numA - numB
      else if(slc == "Price (high to low)")
        return numB - numA
    }))
    .then(sortedArr => {
      // Assert disini
     //   cy.wrap(sortedArr).should('eq',priceListEl);
      expect(sortedArr).to.deep.eq(priceListEl)
    });
    

    
})