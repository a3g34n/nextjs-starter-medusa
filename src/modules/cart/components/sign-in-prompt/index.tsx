import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = ({ dictionary }: { dictionary?: any }) => {
  return (
    <div className="bg-white flex items-center justify-between">
      <div>
        <Heading level="h2" className="txt-xlarge">
          {(dictionary?.cart?.signin_prompt?.split("?")[0] + "?") || "Already have an account?"}
        </Heading>
        <Text className="txt-medium text-ui-fg-subtle mt-2">
          {dictionary?.cart?.signin_prompt?.split("?")[1] || "Sign in for a better experience."}
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button variant="secondary" className="h-10" data-testid="sign-in-button">
            {dictionary?.cart?.signin_btn ?? "Sign in"}
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
