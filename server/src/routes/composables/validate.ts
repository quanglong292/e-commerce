export function validator(schema: any) {
    function validateBodyInput(body: any) {
        console.log({body, schema});

        return body
    }

    return {validateBodyInput}
}