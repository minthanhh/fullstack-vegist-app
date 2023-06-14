const tabContainer = document.querySelector('.tab__container')!;
type ClassActive = {
  navActive: string;
  contentActive: string;
};

async function renderProducts(element: Element, id: string | undefined) {
  const products = await getProducts();
  element.innerHTML = products
    .map((product: Product) => {
      if (product.cateId == id) {
        return `
                  <div class="swiper-slide">
                    <div class="single-product-wrap">
                      <div class="product__image">
                        <a href="./detail.html?id=${product._id}">
                          <img
                            class="img__fluid img1"
                            src="${product.productImage}"
                            alt
                            loading="lazy"
                          />
                          <img
                            class="img__fluid img2"
                            src="${product.imageHover}"
                            alt="Fresh apple"
                            loading="lazy"
                          />
                        </a>
                      </div>
                      <div class="product__content">
                        <div class="product__title">
                          <a href="./detail.html?id=${product._id}">${product.productName}</a>
                        </div>
                        <div class="product__price">
                          <span class="product__price-new">${product.priceNew}</span>
                        </div>
                        <div class="product__rating">
                          <span>
                            <ion-icon name="star-outline"></ion-icon>
                            <ion-icon name="star-outline"></ion-icon>
                            <ion-icon name="star-outline"></ion-icon>
                            <ion-icon name="star-outline"></ion-icon>
                            <ion-icon name="star-outline"></ion-icon>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
      `;
      }
    })
    .join('');
}
function removeClass(navTabs: string, tabsContent: string): void {
  const _navTabs = document.querySelectorAll(navTabs)!;
  const _tabsContent = document.querySelectorAll(tabsContent)!;
  _navTabs.forEach((t) => t.classList.remove('nav__tab-active'));
  _tabsContent.forEach((tc) => tc.classList.remove('tab__content-active'));
}
function addClass(
  classActive: ClassActive,
  datasetTab: string,
  clicked: HTMLSelectElement
): void {
  clicked.classList.add(classActive.navActive);
  document.querySelector(datasetTab)?.classList.add(classActive.contentActive);
  const element = document.querySelector(
    `.wrapper-tabs-${clicked.dataset.id}`
  )!;
  renderProducts(element, clicked.dataset.id);
}
function handleTab(e: Event): void {
  e.preventDefault();
  const clicked = <HTMLSelectElement>e.target;
  const checkClass: HTMLAnchorElement | null = clicked.closest('.nav__tab');
  if (!checkClass) return;
  const classActive: ClassActive = {
    contentActive: 'tab__content-active',
    navActive: 'nav__tab-active',
  };
  removeClass('.nav__tab', '.tab__content');
  addClass(classActive, `.tab__content-${clicked.dataset.tab}`, clicked);
}
tabContainer?.addEventListener('click', handleTab);
// Fetch api
const baseURL: string = 'http://localhost:3000/';
async function getCategories() {
  const res = await fetch(`${baseURL}categories`);
  const categories = (await res.json()).pose;
  return categories;
}
async function getProducts() {
  const res = await fetch(`${baseURL}products`);
  const products = (await res.json()).pose;
  return products;
}
type Category = {
  _id: string;
  cateName: string;
};
type ProductInfo = {
  vendor: string;
  type: string;
  size: string[];
  barcode: number;
  weight: string;
};

type ProductDescMain = {
  moreDetail: string[];
  speccification: string[];
};

type ProductDetail = {
  availability: string;
  productImages: string[];
  productDesc: string;
  productDescMain: ProductDescMain;
  productInfo: ProductInfo;
};
type Product = {
  _id: string;
  productName: string;
  productImage: string;
  imageHover: string;
  priceNew: number;
  priceOld?: number;
  productDetail: ProductDetail;
  cateId: string;
};
async function renderCategories() {
  const categories = await getCategories();
  let htmls = categories.map((category: Category, index: number) => {
    ++index;
    if (index === 1) {
      return `
      <li>
        <a
          class="nav__tab nav__tab-${index} nav__tab-active"
          data-tab="${index}"
          href=""
          data-id="${category._id}"
        >${category.cateName}</a>
      </li>
    `;
    }
    return `
      <li>
        <a
          class="nav__tab nav__tab-${index}"
          data-tab="${index}"
          href=""
          data-id="${category._id}"
        >${category.cateName}</a>
      </li>
    `;
  });
  document
    .querySelector('.tab__container')!
    .insertAdjacentHTML('afterbegin', htmls.join(''));
  return categories;
}
renderCategories();

async function render() {
  const products = await getProducts();
  document.querySelector('.product-container')!.innerHTML = products
    .map((product: Product) => {
      const priceNew = product.priceNew.toLocaleString('vn') + 'đ';
      const priceOld = product.priceOld?.toLocaleString('vn') + 'đ';
      let html = ``;
      html += `
    <div class="single-product-wrap">
      <div class="product__image">
        <a href="./detail.html?id=${product._id}">
          <img
            class="img__fluid img1"
            src="${product.productImage}"
            alt=""
          />
          <img 
            class="img__fluid img2"
            src="${product.imageHover}"
            alt=""
          />
        </a>
      </div>
      <div class="product__content">
        <div class="product__title">
          <a href="./detail.html">${product.productName}</a>
        </div>
        <div class="product__price">
          <span class="product__price-new">${priceNew}</span>
          <span class="product__price-old">${priceOld}</span>
        </div>
        <div class="product__rating">
          <span>
            <ion-icon name="star-outline"></ion-icon>
            <ion-icon name="star-outline"></ion-icon>
            <ion-icon name="star-outline"></ion-icon>
            <ion-icon name="star-outline"></ion-icon>
            <ion-icon name="star-outline"></ion-icon>
          </span>
        </div>
      </div>
    </div>
    `;
      return html;
    })
    .join('');
}

render();

async function renderDescription(
  moreDetail: string[],
  keySpecification: string[]
) {
  moreDetail.map((detail: string) => {
    let html = `
      <li>${detail}</li>
    `;
    document
      .querySelector('#moreDetail')
      ?.insertAdjacentHTML('afterbegin', html);
  });
  keySpecification.map((detail: string) => {
    let html = `
      <li>${detail}</li>
    `;
    document
      .querySelector('#keySpecification')
      ?.insertAdjacentHTML('afterbegin', html);
  });
}
// GET DETAIL PRODUCTS
async function getDetailProduct() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  if (id) {
    const res: Response = await fetch(
      `${baseURL}products/product-detail/${id}`
    );
    const data = (await res.json()).pose[0];
    return data;
  }
}
async function getDetailByid() {
  const detailData = await getDetailProduct();
  if (detailData) {
    const moreDetail = detailData.productDetail.productDescMain.moreDetail;
    const keySpecification =
      detailData.productDetail.productDescMain.specification;
    renderDescription(moreDetail, keySpecification);
  }
}
getDetailByid();
async function renderImage() {
  const detailData = await getDetailProduct();
  if (detailData) {
    detailData.productDetail.productImages.map(
      (image: string, index: number) => {
        let htmls = ``;
        if (index == 0) {
          htmls = `
                <li>
                  <img
                    class="img__fluid small-img active"
                    src="${image}"
                    alt=""
                  />
                </li>
              `;
        } else {
          htmls = `
              <li>
                <img
                  class="img__fluid small-img"
                  src="${image}"
                  alt=""
                />
              </li>
            `;
        }
        document
          .querySelector('.product-images')
          ?.insertAdjacentHTML('beforeend', htmls);
      }
    );
    const imageElement: HTMLImageElement = document.createElement('img');
    imageElement.src = detailData.productImage;
    imageElement.id = 'productImage';
    document.querySelector('.product-image')?.append(imageElement);

    const productImg = document.querySelector(
      '#productImage'
    )! as HTMLImageElement;
    const smallImages = document.querySelectorAll('.small-img')!;
    handleImages(smallImages, productImg);
  }
}
renderImage();
async function handleImages(
  smallImages: NodeList,
  productImage: HTMLImageElement
) {
  smallImages.forEach((img: any) => {
    img.addEventListener('click', () => {
      smallImages.forEach((img: any) => img.classList.remove('active'));
      img.classList.add('active');
      productImage.src = img.src;
    });
  });
}

async function renderDescriptionMain() {
  const detailData = await getDetailProduct();
  const breadcrumbDetail = document.querySelector('#breadcrumbName')!;
  const createNavigation = document.createElement('a');
  if (detailData) {
    createNavigation.innerText = detailData.productName;
    breadcrumbDetail.appendChild(createNavigation);
    const priceNew = detailData.priceNew.toLocaleString('vi-VN') + 'đ';
    const priceOld = detailData.priceOld?.toLocaleString('vi-VN') + 'đ';
    let htmls = `
    <div class="product-title">
      <h2>${detailData.productName}</h2>
    </div>
    <div class="product-rating">
      <span>
        <ion-icon name="star-outline"></ion-icon>
        <ion-icon name="star-outline"></ion-icon>
        <ion-icon name="star-outline"></ion-icon>
        <ion-icon name="star-outline"></ion-icon>
        <ion-icon name="star-outline"></ion-icon>
      </span>
    </div>
    <div class="product-inventory">
      <h6>Khả dụng:</h6>  
      <span>
        ${detailData.productDetail.availability}
        <ion-icon name="checkmark-outline"></ion-icon>
      </span>
    </div>
    <div class="product-price">
      <span class="product-price-new">${priceNew}</span>
      <span class="product-price-old">${priceOld}</span>
    </div>
    <div class="product-desc">${detailData.productDetail.productDesc}</div>
  `;
    document
      .querySelector('#productInfo')
      ?.insertAdjacentHTML('afterbegin', htmls);
  }
}

renderDescriptionMain();

// Functions Drag & Drop
const boxes = document.querySelectorAll('.box')!;
function handleDragDrop() {
  const image = document.querySelector('.image')! as HTMLDivElement;
  boxes.forEach((box: Element) => {
    box.addEventListener('dragstart', (e: Event) => {});
    box.addEventListener('dragover', (e: Event) => {
      e.preventDefault();
    });
    box.addEventListener('drop', () => {
      box.appendChild(image);
    });
  });
}

boxes && handleDragDrop();
// function handleLoadWeb() {
//     if (typeof Storage !== 'undefined') {
//         if (localStorage.clickcount) {
//             localStorage.clickcount = Number(localStorage.clickcount) + 1;
//         } else {
//             localStorage.clickcount = 1;
//         }
//         console.log(localStorage.clickcount);
//     } else {
//         console.log('Sorry, your browser does not support web storage...');
//     }
// }
// window.addEventListener('load', handleLoadWeb);

let contactGeolocation = document.querySelector('.contact-geolocation')!;
const btnGeolocation = document.querySelector('.contact-button-geolocation')!;
btnGeolocation && btnGeolocation.addEventListener('click', getLocation);
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    contactGeolocation.innerHTML =
      'Định vị địa lý không được trình duyệt này hỗ trợ.';
  }
}

function showPosition(position: any) {
  contactGeolocation.innerHTML =
    'Vĩ độ: ' +
    position.coords.latitude +
    '<br>Kinh độ: ' +
    position.coords.longitude;
}

const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
function drawCatFace() {
  const ctx = canvas.getContext('2d')! as CanvasRenderingContext2D;
  // Draw cat face
  ctx.beginPath();
  ctx.arc(25, 25, 20, 0, 2 * Math.PI);
  ctx.fillStyle = 'yellow';
  ctx.fill();
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw eyes
  ctx.beginPath();
  ctx.arc(18, 20, 4, 0, 2 * Math.PI);
  ctx.fillStyle = 'black';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(32, 20, 4, 0, 2 * Math.PI);
  ctx.fillStyle = 'black';
  ctx.fill();

  // Draw nose
  ctx.beginPath();
  ctx.arc(25, 27, 3, 0, 2 * Math.PI);
  ctx.fillStyle = 'black';
  ctx.fill();

  // Draw mouth
  ctx.beginPath();
  ctx.arc(25, 32, 8, 0, Math.PI);
  ctx.stroke();
}

canvas && drawCatFace();

function hanldeListFooter() {
  const btnList = document.querySelectorAll('.foot__title-ipad')!;
  btnList.forEach((item: Element) => {
    item.addEventListener('click', (e: Event) => {
      e.preventDefault();
      const footList = item.parentElement?.querySelector('.foot__list')!;
      const icon = item.querySelector('ion-icon');
      if (icon?.getAttribute('name') == 'add-outline') {
        icon?.setAttribute('name', 'remove-outline');
      } else {
        icon?.setAttribute('name', 'add-outline');
      }
      footList.classList.toggle('active');
    });
  });
}

hanldeListFooter();

async function renderProductsType() {
  const productsType = document.querySelector('#productsType');
  const categories = await getCategories();
  const products: Product[] = await getProducts();
  const productCount = document.querySelector(
    '#productCount'
  )! as HTMLSpanElement;
  productCount.innerText = `${products.length} Sản phẩm`;
  categories.map((cate: Category) => {
    const total = products.reduce((acc: number, cur: Product) => {
      if (cur.cateId == cate._id) ++acc;
      return acc;
    }, 0);
    let html = `<li>
                            <label for="${cate._id}">
                              <input
                                  type="checkbox"
                                  name=""
                                  id="${cate._id}"
                                  class="custom-checkbox"
                                  hidden
                              />
                              <span class="filter-name"
                                  >${cate.cateName}</span
                              >
                              <span class="type-count"
                                  >(${total})</span
                              >
                              <span class="custom-check">
                                  <ion-icon
                                      name="checkmark-outline"
                                  ></ion-icon
                              ></span>
                            </label>
                          </li>`;
    productsType?.insertAdjacentHTML('beforeend', html);
  });
  const categoriesLabel = document.querySelectorAll('#productsType li label');
  categoriesLabel.forEach((label, index: number) => {
    label.addEventListener('click', (e) => {
      const cateId = label.querySelector('input')! as HTMLInputElement;
      const typeSelected = document.querySelector(
        '#typeSelected'
      )! as HTMLSpanElement;
      if (cateId.checked) {
        const productContainer = document.querySelector(
          '.product-container'
        )! as HTMLDivElement;
        const productsHasId: string[] = products.map((product: Product) => {
          let html = ``;
          const priceNew = product.priceNew.toLocaleString('vn') + 'đ';
          const priceOld = product.priceOld?.toLocaleString('vn') + 'đ';
          if (product.cateId == cateId.id) {
            html += `<div class="single-product-wrap">
                        <div class="product__image">
                          <a href="./detail.html?id=${product._id}">
                            <img
                              class="img__fluid img1"
                              src="${product.productImage}"
                              alt
                              loading="lazy"
                            />
                            <img
                              class="img__fluid img2"
                              src="${product.imageHover}"
                              alt="Fresh apple"
                              loading="lazy"
                            />
                          </a>
                        </div>
                        <div class="product__content">
                          <div class="product__title">
                            <a href="./detail.html?id=${product._id}">${product.productName}</a>
                          </div>
                          <div class="product__price">
                            <span class="product__price-new">${priceNew}</span>
                            <span class="product__price-old">${priceOld}</span>
                          </div>
                          <div class="product__rating">
                            <span>
                              <ion-icon name="star-outline"></ion-icon>
                              <ion-icon name="star-outline"></ion-icon>
                              <ion-icon name="star-outline"></ion-icon>
                              <ion-icon name="star-outline"></ion-icon>
                              <ion-icon name="star-outline"></ion-icon>
                            </span>
                          </div>
                        </div>
                    </div>`;
          }
          return html;
        });
        productContainer.innerHTML = productsHasId.join('');
      } else {
        document.querySelector('.product-container')!.innerHTML = products
          .map((product: Product) => {
            const priceNew = product.priceNew.toLocaleString('vn') + 'đ';
            const priceOld = product.priceOld?.toLocaleString('vn') + 'đ';
            let html = ``;
            html += `
              <div class="single-product-wrap">
                <div class="product__image">
                  <a href="./detail.html?id=${product._id}">
                    <img
                      class="img__fluid img1"
                      src="${product.productImage}"
                      alt=""
                    />
                    <img 
                      class="img__fluid img2"
                      src="${product.imageHover}"
                      alt=""
                    />
                  </a>
                </div>
                <div class="product__content">
                  <div class="product__title">
                    <a href="./detail.html">${product.productName}</a>
                  </div>
                  <div class="product__price">
                    <span class="product__price-new">${priceNew}</span>
                    <span class="product__price-old">${priceOld}</span>
                  </div>
                  <div class="product__rating">
                    <span>
                      <ion-icon name="star-outline"></ion-icon>
                      <ion-icon name="star-outline"></ion-icon>
                      <ion-icon name="star-outline"></ion-icon>
                      <ion-icon name="star-outline"></ion-icon>
                      <ion-icon name="star-outline"></ion-icon>
                    </span>
                  </div>
                </div>
              </div>
              `;
            return html;
          })
          .join('');
      }
    });
  });
}
renderProductsType();

async function renderProductsTable() {
  const products: Product[] = await getProducts();
  document.querySelector('#productsTable')!.innerHTML = products
    .map((product, index: number) => {
      ++index;
      return `
                      <tr>
                        <td>${product.productName}</td>
                        <td>
                          <div class="desc-table">
                            <p>${product.productDetail.productDesc}</p>
                          </div>
                        </td>
                        <td>${product.priceNew.toLocaleString('vi')}đ</td>
                        <td>${product.productDetail.availability}</td>
                        <td>
                          <div class="image-table">
                            <img src="${product.productImage}" />
                            <img src="${product.imageHover}" />
                          </div>
                        </td>
                        <td class="text-right">
                            <div class="handle-table d-flex flex-row justify-content-center">
                              <a class="bg-success d-flex justify-content-center align-items-center" href="#!"><i class="bi bi-pencil-square"></i></a>
                              <a class="bg-danger d-flex justify-content-center align-items-center" href="#!"><i class="bi bi-trash3"></i></a>
                              <a class="bg-primary d-flex justify-content-center align-items-center" href="#!"><i class="bi bi-info-lg"></i></a>
                            </div>
                        </td>
                      </tr>
                    `;
    })
    .join('');
}
renderProductsTable();
type Account = {
  username?: string;
  email: string;
  password: string;
};

type Token = {
  refreshToken: string;
  accessToken: string;
};
const formElement = document.querySelector('#register')! as HTMLFormElement;
function handleFormRegister() {
  const inputEmail = document.querySelector('#email')! as HTMLInputElement;
  const inputName = document.querySelector('#username')! as HTMLInputElement;
  const inputPass = document.querySelector('#password')! as HTMLInputElement;
  formElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
      username: inputName.value,
      email: inputEmail.value,
      password: inputPass.value,
    };
    const jsonData = JSON.stringify(formData);
    if (!formData) {
      return {
        success: false,
        message: 'Không có dữ liệu',
      };
    }
    const options = {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: jsonData,
    };
    const res = await fetch('http://localhost:3000/register', options);
    const data: Token = (await res.json()).token;
    if (data) {
      document.cookie = `accessToken=${data.accessToken};`;
      document.cookie = `refreshToken=${data.refreshToken};`;
    }
    inputEmail.value = inputName.value = inputPass.value = '';
    window.location.href = '/client/login.html';
  });
}
formElement && handleFormRegister();

function checkCookie(cookieName: string): boolean {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${cookieName}=`)) {
      return true;
    }
  }
  return false;
}

const handleLogin = async (e: Event) => {
  e.preventDefault();
  const email = document.querySelector('#email')! as HTMLInputElement;
  const password = document.querySelector('#password')! as HTMLInputElement;

  const userInfomation = document.querySelector(
    '#userInfomation'
  )! as HTMLSpanElement;
  const formData: { email?: string; password?: string } = {
    email: email.value,
    password: password.value,
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(formData),
  };
  const res = await fetch('http://localhost:3000/login', options);
  const data = (await res.json()).user;
  console.log(data);
  if (data) {
    document.cookie = 'user=true';
    const notifcationOptions = document.querySelector(
      '.notification-option'
    )! as HTMLDivElement;
    const notificationUser = document.querySelector(
      '.notification-user'
    )! as HTMLDivElement;
    if (checkCookie('user')) {
      notifcationOptions.classList.add('active');
      notificationUser.classList.add('active');
      notificationUser.querySelector('#userInfomation')!.textContent =
        data.username;
      location.href = '/client/index.html';
    } else {
      notifcationOptions.classList.remove('active');
      notificationUser.classList.remove('active');
    }
  }
};
const loginElement = document.querySelector('#login')! as HTMLFormElement;
loginElement && loginElement.addEventListener('submit', handleLogin);

function deleteCookie(cookieName: string): void {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${cookieName}=`)) {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      break;
    }
  }
}

const logoutAuth = document.querySelector('#logoutAuth')! as HTMLAnchorElement;
logoutAuth.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(logoutAuth);
  deleteCookie('user');
  if (checkCookie('user') === false) {
    const notifcationOptions = document.querySelector(
      '.notification-option'
    )! as HTMLDivElement;
    const notificationUser = document.querySelector(
      '.notification-user'
    )! as HTMLDivElement;
    notifcationOptions.classList.remove('active');
    notificationUser.classList.remove('active');
  }
  window.location.href = '/client/login.html';
});

function getCookie(cname: any) {
  let name = cname + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

function createObjectURLsForImages(files: FileList): string[] {
  const objectURLs: string[] = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    objectURLs.push(URL.createObjectURL(file));
  }
  return objectURLs;
}
const inputFile = document.querySelector('#file')! as HTMLInputElement;

const imagesChild = document.querySelectorAll(
  '.image-child'
)! as NodeListOf<HTMLImageElement>;

const handleDisplayImage = () => {
  const files = inputFile.files;
  if (files) {
    // Tạo đường dẫn mới cho nhiều hình ảnh
    const imageUrls = createObjectURLsForImages(files);
    // Sử dụng đường dẫn mới cho nhiều hình ảnh
    imageUrls.forEach((imageUrl, index: number) => {
      imagesChild[index].src = imageUrl;
    });
  }
};
inputFile && inputFile.addEventListener('change', handleDisplayImage);

interface ICreateProduct {
  productName: string;
  priceNew: string;
  priceOld?: string;
  productDesc: string;
  availability: string;
  moreDetail: string;
  specification: string;
}

const createProduct: HTMLFormElement =
  document.querySelector('#createProduct')!;

const formCreateProduct = async (e: Event) => {
  e.preventDefault();
  const formData = new FormData(createProduct);
  const files = (document.querySelector('#file')! as HTMLInputElement).files;
  if (files) {
    const fileList = Object.keys(files).map((key, index: number) => {
      let file = files[parseInt(key)];
      return file;
    });

    fileList.forEach((file: File) => {
      formData.append(`file`, file);
    });
  }

  const res = await fetch(`${baseURL}products/product-create`, {
    method: 'POST',
    body: formData,
  });
  const data = await res.json();
  console.log(data);
};
createProduct && createProduct.addEventListener('submit', formCreateProduct);
