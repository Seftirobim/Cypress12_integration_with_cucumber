import { Given, When, Then, BeforeStep } from "@badeball/cypress-cucumber-preprocessor";



When("The product image must be displayed and be appropriate",() =>{
    cy.get("img[src='/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg']").should('be.visible');
})

When("User add {int} product to cart",(amount) =>{
    for (let i = 1; i <= amount; i++) {
        cy.get('button[id^="add-to-cart"]').contains('Add to cart').click()

    }
})

Then("Button remove and cart icon badge should display corresponding number",() =>{
    let length
    cy.get('button[id^="remove"]').should('be.visible')
        .then(($val) =>{
            length = $val.length
            cy.get('.shopping_cart_badge').should('have.text',length)
        })   
})

When("user clicks all the remove buttons on the selected products",() =>{
    let length
    
    cy.get('button[id^="remove"]').should('be.visible')
    .then(($val) =>{
        length = $val.length
        for (let x = 1; x<= length; x++ ){
            cy.get('button[id^="remove"]').contains('Remove').click()
        }
    })   
})

Then("System should change remove buttons to add to cart buttons on the selected products and remove cart badge",() =>{
    cy.get('.shopping_cart_badge').should('not.exist')
})

When("User clicks on the remove button based on the product named {string}",(prodName) =>{
            
    
    cy.get('.inventory_item_name').contains(prodName)
        .then(()=>{
            let replace = prodName.replace(/ /g,"-").toLowerCase()
            let idBtn = '#remove-' + replace
            cy.get(idBtn).click()
            // cy.log(idBtn)
    })
})
// Melarikan karakter2 khusus dalam string
function escapeString(str) {
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

When("User add products as following",(datatable) =>{
    datatable.hashes().forEach(el => {
        let elString = el.product.toString()
        cy.get('.inventory_item_name').contains(elString)
        .then(()=>{ 
            let replace = elString.replace(/ /g,"-").toLowerCase()
            let idBtn = '#add-to-cart-' + replace
            cy.get(escapeString(idBtn)).click() // Larikan karakter2 khusus pada idBtn menghindari Syntax error, unrecognized expression
            
            // cy.log(idBtn)
        })
    })
    
})

Then("System should remove product named {string} from cart and display corresponding product",(prodName) =>{

    // Ambil URL, kalo urlnya include inventory (page invetory) maka setelah hapus produk di inventory page, 
    // button add-to-cart mengikuti nama produk pada var 'prodName' itu harus visible untuk mengganti tombol remove
    cy.url().then(($url) => {
        if($url.includes('inventory.html')) {
            // Ambil class yg mengandung nama produk
            cy.get('.inventory_item_name').contains(prodName)
                .then(() => {
                    // replace spasi ke '-' dri nama produk dan convert ke lower. cont : sauce-labs-backpack
                    let replace = prodName.replace(/ /g,"-").toLowerCase()
                    //gabung nama id + hasil replace prod name
                    let idBtn = '#add-to-cart-' + replace

                    cy.get(idBtn).should('be.visible')    
                })
        // Kalo urlnya include cart (cart pge) maka assertnya harus not exist
        } else  {
            cy.get('.inventory_item_name')
                .then(() => {
                    let replace = prodName.replace(/ /g,"-").toLowerCase()
                    let rmIdBtn = '#remove-' + replace

                    cy.get(rmIdBtn).should('not.exist')    
                })
          }
    })

    
    
})

When("User click on cart icon",() =>{

    cy.get('.shopping_cart_link').click()
})

Then("System should be navigate user to cart page and selected product must be displayed",() =>{
    
    cy.url().should('include','cart.html')
    cy.get('.inventory_item_desc').should('be.visible')

})

When("User click continue shopping button",() =>{
    cy.get("button[id='continue-shopping']").click()
})

Then("System should be navigate user to inventory page",() =>{
    cy.url().should('include','inventory.html')
   
})

When("User click on checkout button",() => {
    cy.get("button[id='checkout']").click()
})

Then("System should navigate user to checkout step one page",() =>{
    cy.url().should('include','checkout-step-one')
})

When("User input firstname {string}, lastname {string}, and postal code {string}",(firstname,lastname,postal) =>{
    cy.get("input[id='first-name']").type(firstname)
    cy.get("input[id='last-name']").type(lastname)
    cy.get("input[id='postal-code']").type(postal)
})

When("User click continue button",() =>{
    cy.get("input[id='continue']").click()

})

Then("System should display corresponding order data",() =>{
    // Tes logic
    // Assisted by chatGPT
    
    const prices = [] // menampung semua text harga di element 
    let taxElement // menampung text tax yang di element 
    let roundTax // menampung pembulatan pada text tax di element (hasil konversi ke float)
    let subTotalElement // menampung text pada element yang mengandung sub total harga 
    let totalAfterTaxElement // menampung text total ditambah tax di element
    let roundTotAfEl // menampung pembulatan total di tambah tax di element (hasil konversi ke float)
    let totalAfterTax // menampung total + tax (logig script)
    let totalPrice // menampung hasil total dari array prices diatas
    let roundPriceElement // menampung pembulatan total harga di element (hasil konversi ke float)

    cy.get(".inventory_item_price").each(($price) => { // pertama dapatkan harga di class ini
      prices.push($price.text()) // push ke variable array
    }).then(() =>{
        cy.wrap(prices).then(arr => { // bungkus variable array untuk di konversi ke float dan di bulatkan
            const total = arr.reduce((acc, curr) => {
              const price = parseFloat(curr.slice(1))
              return acc + price
            }, 0)
            
            const roundedTotal = Math.round(total * 100) / 100
            totalPrice = roundedTotal
            
          }).then(()=> {
            cy.get('.summary_subtotal_label') // Ambil text subtotal price dan konversi ke float dan di bulatkan
                .then(($val)=>{
                    subTotalElement = $val.text()
                    const convTxtPrice = parseFloat(subTotalElement.split(":")[1].trim().slice(1));
                    roundPriceElement = Math.round(convTxtPrice * 100) / 100

            }).then(() =>{
                cy.wrap(totalPrice).should('eq',roundPriceElement) //Assert totalPrice sama dengan roundPriceElement
            })

             cy.get('.summary_tax_label') // ambil tax text dan konversi ke float dan di bulatkan
                .then(($val) =>{
                    taxElement = $val.text()
                    // cy.log(taxElement)   
                    // cy.log(totalPrice)

                    const convTxtTax = parseFloat(taxElement.split(":")[1].trim().slice(1))
                    roundTax = Math.round(convTxtTax * 100) / 100

                }).then(() =>{ 

                    cy.get("div[class='summary_info_label summary_total_label']") // Ambil Sum total text setelah tax dan konversikan juga
                        .then(($val) =>{
                            totalAfterTaxElement = $val.text()

                            const convTotAfEl = parseFloat(totalAfterTaxElement.split(":")[1].trim().slice(1))
                            roundTotAfEl = Math.round(convTotAfEl * 100) /100

                            totalAfterTax = roundTax + totalPrice // Jumlahkan tax + subtotal

                            cy.wrap(totalAfterTax).should('eq',roundTotAfEl) // assert TotalAfterTax (logic script) sama dengan roundTotAfEl (di element) harus sama
                        })
                })
            })
        })
})

When("User click finish button",() =>{
    cy.get("button[id='finish']").click()
})

Then("system should display thank you message",() =>{
    cy.get(".checkout_complete_container").should('be.visible')
})

Then("System should be navigate user to cart page",() =>{
    cy.url().should('include','cart.html')
})

When("User input lastname {string}, and postal code {int}",(lastname,postal) =>{
    cy.get("input[id='last-name']").type(lastname)
    cy.get("input[id='postal-code']").type(postal)
})

When("User input firstname {string}, and postal code {int}",(firstname,postal) =>{
    cy.get("input[id='first-name']").type(firstname)
    cy.get("input[id='postal-code']").type(postal)
})

When("User input firstname {string}, and lastname {string}",(firstname,lastname) =>{
    cy.get("input[id='first-name']").type(firstname)
    cy.get("input[id='last-name']").type(lastname)
})

When("User input postal code {int}",(postal) =>{
    cy.get("input[id='postal-code']").type(postal)
})

When("User input lastname {string}",(lastname) =>{
    cy.get("input[id='last-name']").type(lastname)
})

When("User input firstname {string}",(firstname) =>{
    cy.get("input[id='first-name']").type(firstname)
})

When("User click cancel button",() =>{
    cy.get("button[name='cancel']").click()
})
