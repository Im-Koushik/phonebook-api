import { Op } from "sequelize";
import { decryptPhoneNumber, encryptPhoneNumber } from "../lib/crypto.js";
import Contact from "../models/contact.model.js";

const encryptionKey = process.env.CRYPTO_SECRET_KEY;

//creating new contacts wit encrypted phone number
export const createContact = async (req, res) => {
  try {
    const { userId, Contacts } = req.body;
    if (!Array.isArray(Contacts)) {
      return res.status(400).json({ message: "Contacts must be an array" });
    }

    const newContacts = [];
    for (const contact of Contacts) {
      const { name, phoneNumber } = contact;

      // Encrypt the phone number
      const encryptedPhoneNumber = encryptPhoneNumber(
        phoneNumber,
        encryptionKey
      );

      const allContacts = await Contact.findAll({
        where: {
          userId: userId,
        },
      });

      const isContactExisting = allContacts.some((c) => {
        const decryptedPhoneNumber = decryptPhoneNumber(
          c.phoneNumber,
          encryptionKey
        );
        return decryptedPhoneNumber === phoneNumber;
      });

      //Skip, if the contact is already existing
      if (isContactExisting) {
        console.log(`Contact with phone number ${phoneNumber} already exists`);
        continue;
      }

      //Create New Contact
      const newContact = await Contact.create({
        userId,
        name,
        phoneNumber: encryptedPhoneNumber,
      });
      newContacts.push(newContact);
    }
    return res.status(201).json({
      success: true,
      message: "Data saved successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get all contacts
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    const decryptedContacts = contacts.map((contact) => {
      const decryptedPhoneNumber = decryptPhoneNumber(
        contact.phoneNumber,
        encryptionKey
      );
      return { ...contact.toJSON(), phoneNumber: decryptedPhoneNumber };
    });
    res.status(200).json(decryptedContacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get contacts with common phone numbers
export const getCommonUsers = async (req, res) => {
  try {
    const { searchNumber } = req.query;

    //find all users with common phoneNumber
    const allContacts = await Contact.findAll();
    const matchingContacts = allContacts.filter((contact) => {
      const decryptedContactNumber = decryptPhoneNumber(
        contact.phoneNumber,
        encryptionKey
      );
      return decryptedContactNumber === searchNumber;
    });

    //get contact name
    let contactName;
    if (matchingContacts.length > 0) {
      contactName = matchingContacts[0].name;
    }
    const commonuserIds = matchingContacts.map((contact) => contact.userId);

    res.status(200).json({
      Name: contactName,
      commonUsers: commonuserIds,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get contacts by user id,searchText and pagination
export const getContactsByUserId = async (req, res) => {
  try {
    const { userId, page = 1, PageSize = 10, searchText } = req.query;

    const options = {
      where: {
        userId: userId,
      },
      limit: parseInt(PageSize),
      offset: (page - 1) * PageSize,
    };

    //count condition
    const totalCountCondition = {
      userId: userId,
    };
    if (searchText) {
      options.where.name = {
        [Op.like]: `%${searchText}%`,
      };
      totalCountCondition.name = {
        [Op.like]: `%${searchText}%`,
      };
    }

    //total contacts
    const totalCount = await Contact.count({
      where: {
        [Op.and]: [totalCountCondition],
      },
    });

    const contacts = await Contact.findAll(options);
    const rows = contacts.map((contact) => ({
      name: contact.name,
      number: contact.phoneNumber,
    }));

    res.status(200).json({
      totalCount: totalCount,
      rows: rows,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
