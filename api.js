$(document).ready(function(){
    // let URL = 'https://fakestoreapi.com'
    
    let control = $ ('.relative')
    control.click(function(){
        let cart = $('.overlay')
        cart.css('display','block')
    })

    let closeBtn = $('.close')
    closeBtn.click(function(){
        let cart = $('.overlay')
        cart.css('display','none')
    })

    // $('#cart').click(function(){
    //     let div = $('#cat');
    //     if (div.is(':visible')) {
    //       // Slide out to the right
    //       div.animate({right: '-300px'}, 500, function() {
    //         div.hide();
    //       });
    //     } else {
    //       div.show().css('right', '-300px').animate({right: '0'}, 500);
    //     }
    //   });


    
    $.ajax({
        url: 'https://fakestoreapi.com/products' ,
        // url: `${URL}/products`,
        type: 'GET',
        success: function(ogam){
            let grid = $('.grid')
            grid.empty()
            // grid.html(``)
            console.log('Data from the api', ogam)

            // loop through the data to display in the browser
            ogam.forEach(e => {
                grid.append(`<div class="items">
            <div class="image">
                <img src=${e.image} alt="" class="img"/>
            </div>
            <div>
                <span>${e.title}</span>
            </div>
            <div class="flex">
                <span>${e.category}</span>
                <span>${e.price}</span>
            </div>
            <i class="fa-solid fa-cart-shopping"></i>

            </div>`)
            })

        },
        error: function(err){
            console.log(err)
        }


    })
    $

    // $.ajax({
    //     url: 'https://fakestoreapi.com/products' ,
    //     type: 'POST',
    //     data: JSON.stringify({
    //         id: 31,
    //         title: 'Sample Product',
    //         price: '29.99',
    //         category: 'electronics',
    //         description: 'A great product for daily use.',
    //         image: 'https://via.placeholder.com/150'


    //     }),
    //     success: function(res){
    //         console.log('Product added successfully',res)
    //     },
    //     error: function(err){
    //         console.log('Error adding product',err)
    //     }
    // })

    $('#productForm').on('submit', function(e){
        e.preventDefault()
        let titles = $("#title").val();
        let prices = $("#price").val();
        let categorys = $("#category").val();
        let descriptions = $("#description").val();
        let images = $("#image").val();
 

    $.ajax({
        url: 'https://fakestoreapi.com/products' ,
        type: 'POST',
        data: JSON.stringify({
            title: titles,
            price: prices,
            category: categorys,
            description: descriptions,
            image: images,
            }),

            success: function(res){
                console.log("Product added successfully",res);
            },
            error: function(err){
                console.log("Error adding product:",err);
            },
        });
    });
});