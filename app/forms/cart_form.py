from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField, IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError


class CartForm(FlaskForm):
    product_id = IntegerField("Post Id", validators=[DataRequired()])
    submit = SubmitField("Submit")
