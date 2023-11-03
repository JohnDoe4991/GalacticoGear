from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField, IntegerField
from wtforms.validators import DataRequired, ValidationError


class ReviewForm(FlaskForm):
    review = TextAreaField("Title", validators=[DataRequired()])
    submit = SubmitField("Submit")
