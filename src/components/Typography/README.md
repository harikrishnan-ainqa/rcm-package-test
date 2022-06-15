# CustomTypography

CustomTypography component that returns the text format

## Props

CustomTypography needs the following props to render the component -

1. type

- It returns the material ui variant props.
- Also it defines the size of the font
- It declares inside the switch case function
  Eg. type={'heading'}
- Available types: heading,caption,title,link

2. text

- It is the required prop type.
- It returns the text
  Eg. text='User Group'

3. colorType

- It returns the required font color which declared in the switch case function
  Eg. colorType='quaternary',
- Available colors= primary,secondary,tertiary,quinary,senary,active,inActive,dark,background

4. customClass :

- Apply styles to the components.This prop act as the className which is the prop of component
  Eg. customClass='textStyle'

5. customStyle

- Apply inline styles on component.
  Eg. customStyle={{background:'red'}}

6. requiredField

- This props mention the required field and it is the boolean prop
  Eg. requiredField
