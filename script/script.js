$(document).ready(function () {
  //   $.getJSON("data/data.json", function (data) {
  //     const container = $(".container");
  //     container.empty();

  //     //Loop through the JSON data and display it
  //     $.each(data, function (index, person) {
  //       const personDiv = $("<div></div>").text(
  //         "Name:" +
  //           person.name +
  //           ", Age:" +
  //           person.age +
  //           ", occupation:" +
  //           person.occupation
  //       );
  //       personDiv.addClass("grid-item");
  //       container.append(personDiv);
  //     });
  //   }).fail(function () {
  //     console.log("Error loading data");
  //   });

  // $(".form").on("submit", function (e) {
  //   e.preventDefault();

  //   let passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/

  //   const input1 = $("#input1").val();
  //   const input2 = $("#input2").val();
  //   const input3 = $("#input3").val();
  //   const input4 = $("#input4").val();

  //   const nameErr = $(".nameErr");
  //   const emailErr = $(".emailErr");
  //   const passwordEerr = $(".passwordEerr");
  //   const confEerr = $(".confEerr");

  //   // nameErr.text('')
  //   // emailErr.text('')
  //   // passwordEerr.text('')
  //   // confEerr.text('')

  //   if (!input1) {
  //     nameErr.text("Name is required");
  //   } else if (input1.length < 3) {
  //     nameErr.text("Name cannot be less than 3 characters");
  //   }else {
  //     nameErr.text("");
  //   }

  //   if(!input2){
  //       emailErr.text('Email cannot be empty')
  //   }else if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(input2)){
  //       emailErr.text('Pls enter a valid email address')
  //   }else{
  //       emailErr.text('')
  //   }

  //   if(!input3){
  //       passwordEerr.text('password cannot be empty')
  //   }else if(input3.length < 6){
  //       passwordEerr.text('password cannot be less than 6 characters')
  //   }else if(!passRegex.test(input3)){
  //       passwordEerr.text('password must contain Aa@')
  //   } else{
  //       passwordEerr.text('')
  //   }

  //   if(!input4){
  //       confEerr.text('Pls comfrim your password')
  //   }else if(input4 != input3){
  //       confEerr.text('password mismatch')
  //   }else{
  //       confEerr.text('')
  //   }
  // });

  //'https://fakestoreapi.com/user-login'

  let count = $('#count')
  let num = localStorage.getItem('count')
  count.text(num)

  let control = $('.relative')
  control.click(function(){
    let cart = $('.overLay')
    cart.css("display", "block")
  })

  let closeBtn = $('.close')
  closeBtn.click(function(){
    let cart = $('.overLay')
    cart.css("display", "none")
  })

  let URL = "https://fakestoreapi.com";

  $.ajax({
    // url: 'https://fakestoreapi.com/products'
    url: `${URL}/products`,
    type: "GET",
    success: function (data) {
      // console.log("Data from the API", data);
      let grid = $(".grid");
      grid.empty();
  
      // Loop through the data to display it in the browser
      data.forEach((e) => {
        grid.append(`
          <div class="items">
            <div class="image">
              <img src="${e.image}" alt="" class="img"/>  
            </div>
            <div>
              <span>${e.title}</span>
            </div>
            <div class="flex">
              <span>${e.category}</span>
              <span>${e.price}</span>
            </div>
            <div>
              <span></span>
            </div>
            <i class="fa fa-cart-plus" aria-hidden="true" data-id="${e.id}"></i>
          </div>
        `);
      });
  
      grid.on('click', (event) => {
        if (event.target.classList.contains('fa-cart-plus')) {
          const id = event.target.getAttribute('data-id');
          const item = data.find((e) => e.id == id); // Use == to avoid type mismatch (e.g., string vs number)
  
          if (item) {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            // Add to cart if not already present
            if (!cart.some((e) => e.id === item.id)) {
              cart.push(item);
              localStorage.setItem("cart", JSON.stringify(cart));
              alert("Item added to cart!");
              // console.log(cart.length)
              let count = cart.length
              localStorage.setItem('count', count)
            } else {
              alert("Item already in cart!");
            }
          } else {
            console.log('Item not found');
          }
          
        }
      });
    },
    error: function (err) {
      console.log("Error", err);
    },
  });
  





  // $.ajax({
  //   url: `${URL}/products`,
  //   type: 'POST',
  //   data: JSON.stringify({
  //     id: 31,
  //     title: 'Sample Product',
  //     price: '29.99',
  //     category: 'electronics',
  //     description: 'A great product for daily use.',
  //     image: 'https://via.placeholder.com/150'
  //   }),
  //   success: function(res){
  //     console.log('Product added successfully:', res)
  //   },
  //   error: function(err){
  //     console.log('Error adding product:', err)
  //   }
  // })

  $("#productForm").on("submit", function (e) {
    e.preventDefault()
    let titles = $("#title").val();
    let prices = $("#price").val();
    let categorys = $("#category").val();
    let descriptions = $("#description").val();
    let images = $("#image").val();

    $.ajax({
      url: `${URL}/products`,
      type: "POST",
      data: JSON.stringify({
        title: titles,
        price: prices,
        category: categorys,
        description: descriptions,
        image: images,
      }),

      success: function (res) {
        console.log("Product added successfully:", res);
      },
      error: function (err) {
        console.log("Error adding product:", err);
      },
    });
  });
});
