function Form() {
  return (
    <>
      <input type="text" name="text" className="input" placeholder="Title" />
      <input type="text" name="text" className="input" placeholder="Image Url" />
      <textarea type="text" name="text" className="input" placeholder="Content" />

      <div className="flex flex-row space-x-2">
        <div className="flex-1">
          <label className="text-white" htmlFor="country">Country</label>
          <select className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-2 py-1" id="country">
            <option value="">Select a country</option>

            <optgroup label="Africa">
              <option value="AF">Afghanistan</option>
              <option value="DZ">Algeria</option>
              <option value="AO">Angola</option>
              ...
              <option value="ZW">Zimbabwe</option>
            </optgroup>

            <optgroup label="Asia">
              <option value="AM">Armenia</option>
              <option value="AZ">Azerbaijan</option>
              <option value="BH">Bahrain</option>
              ...
              <option value="YE">Yemen</option>
            </optgroup>

            <optgroup label="South America">
              <option value="AR">Argentina</option>
              <option value="BO">Bolivia</option>
              <option value="BR">Brazil</option>
              ...
              <option value="VE">Venezuela</option>
            </optgroup>

            ...
          </select>
        </div>
      </div>
    </>
  );
}

export default Form;
