import "./Footer.scss"

const MiddleFooter = () => {
  const dataLinks = {
    "Доска объявлений": ["Объявления","Магазины","Благотворительность","Личный кабинет"],
    "Сервисный центр": ["Что мы чиним","Адреса сервисных центров"],
    "Интернет-магазин": ["Каталог товаров","Доставка и оплата","Корзина","Личный кабинет","Контакты","Вакансии"],
    "Пользователям": ["Гарантии","Доставка и оплата","Служба поддержки","Вопрос-ответ"]
  }
  
    return ( 
      <div className="middle-footer">
      {Object.entries(dataLinks).map(([title, items], index) => (
        <div className="middle-footer__column" key={index}>
          <h3 className="middle-footer__column-title">{title}</h3>
          {items.map((item, i) => (
            <p className="middle-footer__column-link" key={i}>{item}</p>
          ))}
        </div>
      ))}
      </div>
     );
}
 
export default MiddleFooter;