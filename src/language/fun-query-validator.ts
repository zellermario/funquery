import type { ValidationAcceptor, ValidationChecks } from 'langium';
import type { FunQueryAstType, Person } from './generated/ast.js';
import type { FunQueryServices } from './fun-query-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: FunQueryServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.FunQueryValidator;
    const checks: ValidationChecks<FunQueryAstType> = {
        Person: validator.checkPersonStartsWithCapital
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class FunQueryValidator {

    checkPersonStartsWithCapital(person: Person, accept: ValidationAcceptor): void {
        if (person.name) {
            const firstChar = person.name.substring(0, 1);
            if (firstChar.toUpperCase() !== firstChar) {
                accept('warning', 'Person name should start with a capital.', { node: person, property: 'name' });
            }
        }
    }

}
