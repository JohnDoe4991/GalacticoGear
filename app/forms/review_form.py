from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class ReviewForm(FlaskForm):
    review = TextAreaField("Review", validators=[DataRequired()])
    submit = SubmitField("Submit")
