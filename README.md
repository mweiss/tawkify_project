# Tawkify takehome quiz

This repo contains a list input view for Tawkify's takehome quiz.

Some notes:

- I decided to make the component a controlled component, so I added a `values` and `onChange` function.
- On that same note, it was unclear to me if 'form' in the prompt meant web form (e.g. `<form>` elements) or just form in the more general UI sense.  I interpreted it as the latter, so I didn't add any hidden input elements to represent the values, or try to do any of the cool stuff that libraries like `Formik` does.
- I ended up using MUI and react-drag-listview libraries to speed up UI development.  However, after testing it seems like react-drag-listview doesn't work on [mobile devices](https://github.com/raisezhang/react-drag-listview/issues/42).  But since this is just an exercise I kept the library.
- This project was bootstrapped with `create-react-app`.  See [CreateReactApp-README.md](CreateReactApp-README.md) for building and dev instructions.
- There's a few edge cases in usage like if `values` property is greater than `max`.  I don't validate these case, since I decided in the interest of implementation time it's the responsibility of the developer to use the component correctly.
