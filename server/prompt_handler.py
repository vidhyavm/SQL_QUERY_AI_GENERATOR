#prompt_handler
import openai
import os
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

# Configure OpenAI API settings
api_key = os.getenv("AZURE_OPENAI_API_KEY")
endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")
deployment_name = os.getenv("AZURE_OPENAI_DEPLOYMENT_NAME")
model = "gpt-4"

# Setting OpenAI API configurations
openai.api_type = "azure"
openai.api_key = api_key
openai.api_base = endpoint
openai.api_version = "2023-03-15-preview"

def generate_sql_prompt(prompt):
    if not prompt or prompt.strip() == "":
        return "Invalid input: Prompt cannot be empty."
    try:
        response = openai.ChatCompletion.create(
            engine=deployment_name,
            messages=[
                {"role": "system", "content": "You are an assistant that helps generate SQL queries."},
                {"role": "user", "content": f"Generate an SQL query for: {prompt}"}
            ]
        )
        return response.choices[0].message["content"].strip()
    
    except openai.OpenAIError as e:
        if "Invalid Request" in str(e):
            return "Invalid input: Unable to process the prompt."
        return f"OpenAI API Error: {str(e)}"

    except Exception as e:
        return str(e)

# Example usage
if __name__ == "__main__":
    test_prompts = [
        "retrieve the names and ages of all employees from the employee table",
        "gibberish",
        "Show me the price of a product that doesn't exist."
    ]
    
    for prompt in test_prompts:
        sql_query = generate_sql_prompt(prompt)
        print(f"Prompt: {prompt}\nSQL Query: {sql_query}\n")