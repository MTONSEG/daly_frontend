import ColorPicker from '../../../widgets/fragments/ColorPicker/ColorPicker'
import './ProductInfoCenter.scss'

const ProductInfoCenter = () => {
	return (
		<div className='product__info'>
			<div className='product__info_left'>
				<div className='product__info_left_top'>
					<p className='product__info_left_top_text'>Объем памяти</p>
					<div className='product__info_left_top__params'>
						<button className='product__info_left_top__params_btn'>1</button>
						<button className='product__info_left_top__params_btn'>2</button>
						<button className='product__info_left_top__params_btn'>3</button>
					</div>
				</div>
				<div className='product__info_left_center'>
					<p className='product__info_left_center_text'>Цвет</p>
					<ColorPicker variant='forPage' />
				</div>
				<div className='product__info_left_bottom'>
					<p className='product__info_left_bottom_text'>Характеристики</p>
					<div className='product__info_left_bottom__param'>
						<div className='product__info_left_bottom__param-wr'>
							<p className='product__info_left_bottom__param_key'>Диагональ:</p>
							<p className='product__info_left_bottom__param_value'>5 дюймов</p>
						</div>
						<div className='product__info_left_bottom__param-wr'>
							<p className='product__info_left_bottom__param_key'>Диагональ:</p>
							<p className='product__info_left_bottom__param_value'>5 дюймов</p>
						</div>
						<p className='product__info_left_bottom__param_all'>Все характеристики</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductInfoCenter
