from flask_wtf import FlaskForm
from wtforms import SubmitField, IntegerField
from wtforms.validators import DataRequired


class FavoriteForm(FlaskForm):
    product_id = IntegerField("Product Id", validators=[DataRequired()])
    submit = SubmitField("Submit")
