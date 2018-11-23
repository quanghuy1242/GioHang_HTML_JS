let danhSachSanPhamUl = document.querySelector('.danhSachSanPham');
let danhSachSanPhamCart = document.querySelector('.cart');
let danhSachSanPham = [{
    id: 1,
    name: "Trà Bí Đao",
    price: 8000
  },
  {
    id: 2,
    name: "Dầu Ô liu",
    price: 785000
  },
  {
    id: 3,
    name: "Lạc hoá học",
    price: 6000
  },
  {
    id: 4,
    name: "Bim bim",
    price: 5000
  },
  {
    id: 5,
    name: "Sting dâu",
    price: 10000
  },
  {
    id: 6,
    name: "Sữa rửa mặt PS Total",
    price: 55000
  },
  {
    id: 7,
    name: "Cà Phê Pin",
    price: 8000
  },
  {
    id: 8,
    name: "Pepsi Coca",
    price: 15000
  }
];
let cart = [

];

function renderDanhSachSanPham(item, danhSachDich) {
  let mainCard = document.createElement('div');
  mainCard.className = "card m-2"

  let sanPham = document.createElement('div');
  sanPham.className = "card-body"

  let stt = document.createElement('div');
  stt.className = 'stt card-header';
  let sttText = document.createTextNode(item.id);
  stt.appendChild(sttText);

  let tensp = document.createElement('div');
  let tenspText = document.createTextNode(item.name);
  tensp.appendChild(tenspText);

  let giasp = document.createElement('div');
  let giaspText = document.createTextNode(item.price);
  giasp.appendChild(giaspText);

  let btnAddToCart = document.createElement('button');
  let btnText = document.createTextNode('Add to Cart');
  btnAddToCart.className = "btn btn-primary addToCart"
  btnAddToCart.appendChild(btnText);

  sanPham.append(tensp, giasp, btnAddToCart);
  mainCard.append(stt, sanPham);
  danhSachDich.appendChild(mainCard);
}

function renderDanhSachSanPhamtoCart(item, danhSachDich) {
  let sanPham = document.createElement('tr');

  let stt = document.createElement('td');
  stt.className = 'stt';
  let sttText = document.createTextNode(item.id);
  stt.appendChild(sttText);

  let tensp = document.createElement('td');
  let tenspText = document.createTextNode(item.name);
  tensp.appendChild(tenspText);

  let giasp = document.createElement('td');
  let giaspText = document.createTextNode(item.price);
  giasp.appendChild(giaspText);

  let tdInput = document.createElement('td');

  let inputQuantity = document.createElement('input');
  inputQuantity.setAttribute('type', 'number');
  inputQuantity.setAttribute('value', 1);
  inputQuantity.className = "soLuong form-control";

  tdInput.appendChild(inputQuantity);

  sanPham.append(stt, tensp, giasp, tdInput);
  danhSachDich.appendChild(sanPham);
}

/* Main */
for(let item of danhSachSanPham) {
  renderDanhSachSanPham(item, danhSachSanPhamUl)
}

document.querySelectorAll('.addToCart').forEach(item => {
  item.addEventListener('click', (e) => {
    let masp = e.path[2].querySelector('.stt').innerHTML;
    let daTonTai = cart.find((item) => item.id.toString() === masp);

    if (typeof(daTonTai) === 'undefined') {
      let sanPhamDuocChon = danhSachSanPham.find((i) => i.id.toString() === masp);
      cart.push(sanPhamDuocChon);
      
      document.querySelector('#tongsp').innerHTML = '(' + cart.length + ')';

      danhSachSanPhamCart.innerHTML = '';
      for(let item of cart) {
        renderDanhSachSanPhamtoCart(item, danhSachSanPhamCart);
      }
    }
    else {
      alert('Sản phẩm này đã có trong giỏ hàng, vui lòng chọn sản phẩm khác!')
    }
  });
});

document.querySelector('#thanhToan').addEventListener('click', () => {
  let sum = 0;
  for(let item of cart) {
    document.querySelectorAll('.cart tr').forEach(i => {
      if (i.childNodes[0].innerHTML === item.id.toString()) {
        item.soLuong = i.childNodes[3].childNodes[0].value;
      }
    });
    sum += parseInt(item.price) * parseInt(item.soLuong);
  }
  document.querySelector('#thanhTien').innerHTML = sum;
});
/* end Main */